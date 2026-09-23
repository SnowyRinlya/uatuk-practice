CREATE TABLE `question_statistics` (
	`question_id` text PRIMARY KEY NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`correct_attempts` integer DEFAULT 0 NOT NULL,
	`total_time_ms` integer DEFAULT 0 NOT NULL,
	`calibrated_difficulty` real,
	`calibration_uncertainty` real,
	`updated_at` text NOT NULL
);
