const ASSETS = __EMBEDDED_ASSETS__;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8'
};

const json = (value, status = 200) => new Response(JSON.stringify(value), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8' }
});

async function readBody(request) {
  try { return await request.json(); } catch { return null; }
}

async function getDifficulty(request, env) {
  const body = await readBody(request);
  const ids = Array.isArray(body?.ids)
    ? [...new Set(body.ids.filter(id => typeof id === 'string' && id.length <= 80))].slice(0, 500)
    : [];
  if (!ids.length) return json({ statistics: {} });

  const placeholders = ids.map(() => '?').join(',');
  const result = await env.DB.prepare(
    `SELECT question_id, attempts, correct_attempts, total_time_ms,
            calibrated_difficulty, calibration_uncertainty
       FROM question_statistics
      WHERE question_id IN (${placeholders})`
  ).bind(...ids).all();

  const statistics = {};
  for (const row of result.results || []) statistics[row.question_id] = row;
  return json({ statistics });
}

async function recordAttempts(request, env) {
  const body = await readBody(request);
  const attempts = Array.isArray(body?.attempts) ? body.attempts.slice(0, 50) : [];
  if (!attempts.length) return json({ error: 'No valid attempts supplied.' }, 400);

  const now = new Date().toISOString();
  const statement = env.DB.prepare(`
    INSERT INTO question_statistics (
      question_id, attempts, correct_attempts, total_time_ms,
      calibrated_difficulty, calibration_uncertainty, updated_at
    ) VALUES (?, 1, ?, ?, ?, 0.4444444444, ?)
    ON CONFLICT(question_id) DO UPDATE SET
      attempts = attempts + 1,
      correct_attempts = correct_attempts + excluded.correct_attempts,
      total_time_ms = total_time_ms + excluded.total_time_ms,
      calibrated_difficulty = 1.0 - (
        (correct_attempts + excluded.correct_attempts + 4.0) /
        (attempts + 9.0)
      ),
      calibration_uncertainty = 4.0 / (attempts + 9.0),
      updated_at = excluded.updated_at
  `);

  const writes = [];
  for (const attempt of attempts) {
    if (typeof attempt?.questionId !== 'string' || attempt.questionId.length > 80) continue;
    const correct = attempt.correct === true ? 1 : 0;
    const timeMs = Math.max(0, Math.min(3600000, Number(attempt.timeMs) || 0));
    const initialDifficulty = 1 - ((correct + 4) / 9);
    writes.push(statement.bind(attempt.questionId, correct, Math.round(timeMs), initialDifficulty, now));
  }
  if (!writes.length) return json({ error: 'No valid attempts supplied.' }, 400);
  await env.DB.batch(writes);
  return json({ recorded: writes.length });
}

function serveAsset(pathname) {
  const path = pathname === '/' ? '/index.html' : pathname;
  const content = ASSETS[path];
  if (content === undefined) return new Response('Not found', { status: 404 });
  const extension = path.slice(path.lastIndexOf('.'));
  return new Response(content, {
    headers: {
      'content-type': types[extension] || 'text/plain; charset=utf-8',
      'cache-control': extension === '.html' ? 'no-cache' : 'public, max-age=3600'
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (request.method === 'POST' && url.pathname === '/api/difficulty') return await getDifficulty(request, env);
      if (request.method === 'POST' && url.pathname === '/api/attempts') return await recordAttempts(request, env);
      if (request.method === 'GET') return serveAsset(url.pathname);
      return new Response('Method not allowed', { status: 405 });
    } catch (error) {
      console.error('Request failed', error);
      return url.pathname.startsWith('/api/')
        ? json({ error: 'Statistics are temporarily unavailable.' }, 503)
        : new Response('Service unavailable', { status: 503 });
    }
  }
};
