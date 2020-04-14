--database is named "svenplan_db"
--everything in database connects- but there are 2 distinctive sections: subscriber and admin
--these instructions start with admin side, then subscriber side
--at the end there are some potentially useful queries (starting with insertion/sample data)


-------------------------
--  ADMIN SIDE TABLES  --
-------------------------

CREATE TABLE "workflows"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);
CREATE TABLE "phases"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "workflow_id" INT REFERENCES "workflows"("id") ON DELETE CASCADE,
    "sequence" INT,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);
CREATE TABLE "default_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "phase_id" INT REFERENCES "phases"("id") ON DELETE CASCADE,
    "sequence" INT,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);
CREATE TABLE "links"
(
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR,
    "description" VARCHAR,
    "url" VARCHAR,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE
);
CREATE TABLE "types"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);
CREATE TABLE "tasks_types"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "type_id" INT REFERENCES "types"("id") ON DELETE CASCADE
);

CREATE TABLE "riskareas"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "workflow_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);
CREATE TABLE "tasks_riskareas"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "riskarea_id" INT REFERENCES "riskareas"("id") ON DELETE CASCADE
);
CREATE TABLE "inputs"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR
);
CREATE TABLE "tasks_inputs"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "input_id" INT REFERENCES "inputs"("id") ON DELETE CASCADE,
    "instructions" VARCHAR
);

------------------------------
--  SUBSCRIBER SIDE TABLES  --
------------------------------

CREATE TABLE "teams"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL
);
CREATE TABLE "users"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "level" INT DEFAULT 1,
    "team_id" INT REFERENCES "teams"("id") ON DELETE CASCADE
);
CREATE TABLE "projects"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) UNIQUE NOT NULL,
    "team_id" INT REFERENCES "teams"("id") ON DELETE CASCADE,
    "description" VARCHAR,
    "due" TIMESTAMPTZ,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);
CREATE TABLE "assigned_tasks"
(
    "id" SERIAL PRIMARY KEY,
    "default_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE,
    "project_id" INT REFERENCES "projects"("id") ON DELETE CASCADE,
    "completed" BOOLEAN DEFAULT false,
    "due" TIMESTAMPTZ,
    "updated" TIMESTAMPTZ
);
CREATE TABLE "notes"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "text" VARCHAR,
    "timestamp" TIMESTAMPTZ
);
CREATE TABLE "assignments"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ
);
CREATE TABLE "subtasks"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ
);
CREATE TABLE "actiontypes"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL
);

CREATE TABLE "actions"
(
    "id" SERIAL PRIMARY KEY,
    "task_id" INT REFERENCES "assigned_tasks"("id") ON DELETE CASCADE,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE,
    "type_id" INT REFERENCES "actiontypes"("id") ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ
);

----------------------------------
--INSERTION QUERIES/EXAMPLE DATA--
----------------------------------


INSERT INTO "workflows"
    ("name", "description", "created")
VALUES
    ('Small Business/Nonprofit Development', 'a plan for small businesses and local nonprofits getting into the world of developing', NOW()),
    ('Restaurant Buildout', 'a plan for interior designers working on a restaurant buildout', NOW());

INSERT INTO "phases"
    ("name", "description", "workflow_id", "sequence", "created")
VALUES
    ('Ideation', 'gather and document ideas', 1, 1, NOW()),
    ('Concept Development', 'map out goals and make tentative plans', 1, 2, NOW()),
    ('Feasibility', 'evaluate the probabilities of success and failure', 1, 3, NOW()),
    ('Risk Management', 'identify and reduce risks in all areas', 1, 4, NOW()),
    ('Implementation', 'initiate plan execution', 1, 5, NOW()),
    ('Post-Project Commissioning/Lease-Up', 'rent applicable units', 1, 6, NOW()),
    ('Asset Management', 'make a five year plan with an expert', 1, 7, NOW()),
    ('Disposition', 'weigh pros and cons of next steps', 1, 8, NOW()),
    ('Ideation', 'gather and document ideas', 2, 1, NOW()),
    ('Design Development', 'gain client approval on moodboards and samples', 2, 2, NOW()),
    ('Contracting', 'enlist and schedule third parties required', 2, 3, NOW()),
    ('Implementation', 'ensure completion of necessary labor and production', 2, 4, NOW()),
    ('Handoff', 'make final touches, document, and present to client', 2, 5, NOW());

INSERT INTO "default_tasks"
    ("name", "description", "phase_id", "sequence", "created")
VALUES
    ('Project Trigger', 'description about the project trigger task', 1, 1, NOW()),
    ('Site Investigation', 'description about the site investigation task', 1, 2, NOW()),
    ('Back of the Envelope Pro Forma', 'description about the back of the envelope pro forma task', 1, 3, NOW()),
    ('High Level Concept Plan', 'description about the high level concept plan task', 1, 4, NOW()),
    ('Go/No Go Determination', 'description about the go/no go determination task', 1, 5, NOW()),
    ('Identify & Record Interest', 'description about the identify and record interest task', 2, 1, NOW()),
    ('Third-Party Partner Solicitation', 'description about the third party partner solicitation task', 2, 2, NOW()),
    ('Design Vision Package', 'description about the design vision package task', 2, 3, NOW()),
    ('Gather Initial Feedback', 'description about the gather initial feedback task', 2, 4, NOW()),
    ('Back of the Envelope 2.0', 'description about the back of the envelope two task', 2, 5, NOW()),
    ('Go/No Go Determination', 'description about the go/no go determination task', 2, 6, NOW()),
    ('Project Trigger', 'description about the project trigger task', 9, 1, NOW()),
    ('Site Investigation', 'description about the site investigation task', 9, 2, NOW()),
    ('Back of the Envelope Pro Forma', 'description about the back of the envelope pro forma task', 9, 3, NOW()),
    ('High Level Concept Plan', 'description about the high level concept plan task', 9, 4, NOW()),
    ('Go/No Go Determination', 'description about the go/no go determination task', 9, 5, NOW()),
    ('Identify & Record Interest', 'description about the identify and record interest task', 10, 1, NOW()),
    ('Third-Party Partner Solicitation', 'description about the third party partner solicitation task', 10, 2, NOW()),
    ('Design Vision Package', 'description about the design vision package task', 10, 3, NOW()),
    ('Gather Initial Feedback', 'description about the gather initial feedback task', 10, 4, NOW()),
    ('Back of the Envelope 2.0', 'description about the back of the envelope two task', 10, 5, NOW()),
    ('Go/No Go Determination', 'description about the go/no go determination task', 10, 6, NOW())
;

INSERT INTO "links"
    ("type","description", "url", "task_id")
VALUES
    ('example', 'an example of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 1),
    ('example', 'an example of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 2),
    ('example', 'an example of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 2),
    ('example', 'an example of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 4),
    ('example', 'an example of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 5),
    ('example', 'an example of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 14),
    ('tutorial', 'a tutorial of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 1),
    ('tutorial', 'a tutorial of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 7),
    ('tutorial', 'a tutorial of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 8),
    ('tutorial', 'a tutorial of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 8),
    ('tutorial', 'a tutorial of how to do this step', 'https://www.youtube.com/watch?v=29hDInnNcDM', 12);

INSERT INTO "types"
    ("name", "description", "created")
VALUES
    ('Communication', 'description of this task type', NOW()),
    ('To-Do', 'description of this task type', NOW()),
    ('Third-Party', 'description of this task type', NOW()),
    ('Calculation', 'description of this task type', NOW()),
    ('Internal Decision Making', 'description of this task type', NOW());

INSERT INTO "tasks_types"
    ("task_id", "type_id")
VALUES
    ( 1, 2 ),
    ( 2, 2 ),
    ( 2, 1 ),
    ( 3, 4 ),
    ( 4, 2 ),
    ( 5, 5 ),
    ( 6, 2 ),
    ( 6, 1 ),
    ( 7, 2 ),
    ( 8, 3 ),
    ( 9, 1 ),
    ( 10, 4 ),
    ( 11, 5 );


INSERT INTO "riskareas"
    ("name", "description", "created", "workflow_id")
VALUES
    ('Site Control', 'description of this risk area', NOW(), 1),
    ('Urban Planning & Design', 'description of this risk area', NOW(), 1),
    ('Architectural Design', 'description of this risk area', NOW(), 1),
    ('Engineering', 'description of this risk area', NOW(), 1),
    ('Environmental', 'description of this risk area', NOW(), 1),
    ('Geotechnical', 'description of this risk area', NOW(), 1),
    ('Capital Markets', 'description of this risk area', NOW(), 1),
    ('Financing/Pro Forma Modeling', 'description of this risk area', NOW(), 1),
    ('Community Engagement', 'description of this risk area', NOW(), 1),
    ('Construction', 'description of this risk area', NOW(), 1),
    ('Commissioning', 'description of this risk area', NOW(), 1),
    ('Property Management', 'description of this risk area', NOW(), 1),
    ('Asset Management', 'description of this risk area', NOW(), 1),
    ('Disposition', 'description of this risk area', NOW(), 1),
    ('Leasing & Marketing', 'description of this risk area', NOW(), 1),
    ('Legal', 'description of this risk area', NOW(), 1);

INSERT INTO "tasks_riskareas"
    ("task_id", "riskarea_id")
VALUES
    ( 1, 6 ),
    ( 2, 6 ),
    ( 3, 6 ),
    ( 3, 7 ),
    ( 3, 8 ),
    ( 4, 6 ),
    ( 5, 6 ),
    ( 6, 16 ),
    ( 6, 1 ),
    ( 7, 6 ),
    ( 7, 10 ),
    ( 7, 3 ),
    ( 7, 4 ),
    ( 8, 2 ),
    ( 8, 3 ),
    ( 9, 7 ),
    ( 9, 8 ),
    ( 9, 10 ),
    ( 9, 15 ),
    ( 10, 7 ),
    ( 10, 8 ),
    ( 10, 10 ),
    ( 10, 6 ),
    ( 10, 15 ),
    ( 11, 6 );


INSERT INTO "inputs"
    ("name", "description")
VALUES
    ('button', 'click a button'),
    ('checkbox', 'select all that apply'),
    ('radio', 'select one'),
    ('number', 'enter a number'),
    ('email', 'enter an email'),
    ('tel', 'enter a phone number'),
    ('text', 'type something'),
    ('url', 'enter a url');

INSERT INTO "tasks_inputs"
    ("input_id", "task_id", "instructions")
VALUES
    (7, 1, 'leave a note'),
    (7, 3, 'leave a note'),
    (7, 5, 'leave a note'),
    (7, 7, 'leave a note'),
    (7, 9, 'leave a note'),
    (7, 11, 'leave a note'),
    (7, 13, 'leave a note'),
    (7, 15, 'leave a note'),
    (7, 17, 'leave a note'),
    (7, 19, 'leave a note'),
    (7, 21, 'leave a note'),
    (7, 22, 'leave a note'),
    (1, 1, 'click submit'),
    (1, 2, 'click submit'),
    (1, 3, 'click submit'),
    (1, 4, 'click submit'),
    (1, 5, 'click submit'),
    (1, 6, 'click submit'),
    (1, 7, 'click submit'),
    (1, 8, 'click submit'),
    (1, 9, 'click submit'),
    (1, 10, 'click submit'),
    (1, 11, 'click submit'),
    (1, 12, 'click submit'),
    (1, 13, 'click submit'),
    (1, 14, 'click submit'),
    (1, 15, 'click submit'),
    (1, 16, 'click submit'),
    (1, 17, 'click submit'),
    (1, 18, 'click submit'),
    (1, 19, 'click submit'),
    (1, 20, 'click submit'),
    (1, 21, 'click submit'),
    (1, 22, 'click submit');

INSERT INTO "teams"
    ("name")
VALUES
    ('NEOO Partners'),
    ('Super Sweet Quaranteam'),
    ('Interior Design Team');

INSERT INTO "users"
    ("username", "password", "team_id")
VALUES
    ('DAngelos', 'password123', 3),
    ('Todd', 'password123', 3),
    ('Denetrick', 'password123', 3);

INSERT INTO "projects"
    ("name", "team_id", "description", "created")
VALUES
    ('Duck Donuts', 3, 'a short or long description of the project', NOW()),
    ('Regional Acceleration Center', 3, 'a short or long description of the project', NOW());


INSERT INTO "assigned_tasks"
    ("default_id", "project_id")
VALUES
    ( 1, 9 ),
    ( 2, 9),
    ( 3, 9),
    ( 4, 9 ),
    ( 5, 9 ),
    ( 6, 9 ),
    ( 7, 9 ),
    ( 8, 9 ),
    ( 9, 9),
    ( 10, 10 ),
    ( 11, 10 ),
    ( 12, 10),
    ( 13, 10),
    ( 14, 10 ),
    ( 15, 10),
    ( 16, 10 ),
    ( 17, 10),
    ( 18, 10),
    ( 19, 10 ),
    ( 20, 10),
    ( 21, 10 ),
    ( 22, 10);

INSERT INTO "notes"
    ("task_id", "user_id", "text", "timestamp")
VALUES
    (45, 21, 'can someone explain to me what project trigger means?', NOW());

INSERT INTO "notes"
    ("task_id", "user_id", "text", "timestamp")
VALUES
    (45, 23, 'it is when you trigger a project', NOW());

-------------------
--  GET QUERIES  --
-------------------

--get task names for a certain project, and whether or not they're done.
SELECT "default_tasks"."name" AS "task_name", "assigned_tasks"."completed"
FROM "default_tasks" JOIN "assigned_tasks" ON
"default_tasks"."id"="assigned_tasks"."default_id"
WHERE  "assigned_tasks"."project_id"=1;

--get the number of risk areas per workflow (this will be how many radial axes in risk chart)
SELECT "workflows"."name" AS "workflow", COUNT(*) AS "number_of_risk_areas"
FROM "workflows" JOIN "riskareas"
    ON "riskareas"."workflow_id"="workflows"."id"
GROUP BY "workflows"."name";

--get the number of tasks per risk area per workflow (this will help calculate how much risk is removed with completion of a task in a certian risk category)
SELECT "riskareas"."name" AS "riskarea", COUNT(*) AS "number_of_tasks"
FROM "riskareas"
    JOIN "tasks_riskareas" ON "tasks_riskareas"."riskarea_id"="riskareas"."id"
    JOIN "default_tasks" ON "default_tasks"."id"="tasks_riskareas"."task_id"
GROUP BY "riskareas"."name";

--(once populated with data) get comments and who left them and at what time from oldest to newest, on a certain task
SELECT "notes"."text" AS "note", "users"."username" AS "user", "notes"."timestamp" AS "time"
FROM "notes" JOIN "users"
    ON "notes"."user_id"="users"."id"
WHERE "notes"."task_id"=1
ORDER BY "timestamp";

---------------------
--  OTHER QUERIES  --
---------------------

--mark a task complete (decide how to skip later...)
UPDATE "assigned_tasks" SET "completed"=true WHERE "id"=5;

--change a user's level (eg from subscriber to admin)
UPDATE "users" SET "level"=100 WHERE "username"='DAngelos';




