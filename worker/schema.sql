PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS courses (
 id TEXT PRIMARY KEY, year INTEGER NOT NULL, title TEXT NOT NULL, audience TEXT, location TEXT,
 start_date TEXT, end_date TEXT, enrollment_start TEXT, enrollment_end TEXT, seats INTEGER,
 requirements TEXT, details TEXT, status TEXT NOT NULL DEFAULT 'draft', enrollment_url TEXT,
 enrollment_open INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_courses_year_status ON courses(year,status);
CREATE TABLE IF NOT EXISTS enrollments (
 id TEXT PRIMARY KEY, course_id TEXT NOT NULL, candidate_ref TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'received', created_at TEXT NOT NULL, updated_at TEXT,
 FOREIGN KEY(course_id) REFERENCES courses(id)
);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_status ON enrollments(course_id,status);
CREATE TABLE IF NOT EXISTS audit_log (
 id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, actor_subject TEXT NOT NULL,
 action TEXT NOT NULL, target_type TEXT NOT NULL, target_id TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_at ON audit_log(at DESC);
