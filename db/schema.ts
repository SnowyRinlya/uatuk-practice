import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const questionStatistics = sqliteTable('question_statistics', {
  questionId: text('question_id').primaryKey(),
  attempts: integer('attempts').notNull().default(0),
  correctAttempts: integer('correct_attempts').notNull().default(0),
  totalTimeMs: integer('total_time_ms').notNull().default(0),
  calibratedDifficulty: real('calibrated_difficulty'),
  calibrationUncertainty: real('calibration_uncertainty'),
  updatedAt: text('updated_at').notNull()
});
