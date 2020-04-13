--database is named "svenplan_db"
--everything in database connects- but there are 2 distinctive sections: subscriber and admin
--these instructions start with admin side, then subscriber side
--at the end there are some potentially useful queries (starting with insertion/sample data)


-------------------------
--  ADMIN SIDE TABLES  --
-------------------------

--create workflows table
CREATE TABLE "workflows"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR
);

--create phases table
CREATE TABLE "phases"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "workflow_id" INT REFERENCES "workflows"("id") ON DELETE CASCADE
);

--create default_tasks table
CREATE TABLE "default_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "phase_id" INT REFERENCES "phases"("id") ON DELETE CASCADE
);

--create links table
CREATE TABLE "links"
(
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR,
    "description" VARCHAR,
    "url" VARCHAR,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE
);

--create types table
CREATE TABLE "types"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR
);

--create tasks_types junction table
CREATE TABLE "tasks_types"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "type_id" INT REFERENCES "types"("id") ON DELETE CASCADE
);

--create riskareas table
CREATE TABLE "riskareas"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR
);

--create tasks_riskareas junction table
CREATE TABLE "tasks_riskareas"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "riskarea_id" INT REFERENCES "riskareas"("id") ON DELETE CASCADE
);


--create inputs table
CREATE TABLE "inputs"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR
);

--create tasks_inputs junction table
CREATE TABLE "tasks_inputs"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "input_id" INT REFERENCES "inputs"("id") ON DELETE CASCADE
);


------------------------------
--  SUBSCRIBER SIDE TABLES  --
------------------------------

--create teams table
CREATE TABLE "teams"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL
);

--create users table
CREATE TABLE "users"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "level" INT DEFAULT 1,
    "team_id" INT REFERENCES "teams"("id") ON DELETE CASCADE
);

--create projects table
CREATE TABLE "projects"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) UNIQUE NOT NULL,
    "team_id" INT REFERENCES "teams"("id") ON DELETE CASCADE,
    "description" VARCHAR,
    "due" TIMESTAMPTZ,
    "started" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);


--create assigned_tasks table
CREATE TABLE "assigned_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "default_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "project_id" INT REFERENCES "projects"("id") ON DELETE CASCADE,
    "completed" BOOLEAN DEFAULT false,
    "due" TIMESTAMPTZ,
    "started" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);

--create notes table
CREATE TABLE "notes"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "text" VARCHAR,
    "timestamp" TIMESTAMPTZ
);

--create assignments table
CREATE TABLE "assignments"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ
);

--create subtasks table
CREATE TABLE "subtasks"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ
);

--create actions table
CREATE TABLE "actions"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "type_id" INT REFERENCES "actiontypes"("id") ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ
);

--create actiontypes table
CREATE TABLE "actiontypes"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL
);
