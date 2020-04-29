--database is named "svenplan_db"

-----------------
--CREATE TABLES--
-----------------

CREATE TABLE "workflows"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "team_id" INT REFERENCES "teams"."id" ON DELETE CASCADE,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ,
    "published" BOOLEAN DEFAULT FALSE
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
    "type" VARCHAR NOT NULL,
    "prompt" VARCHAR,
    "task_id" INT REFERENCES "default_tasks"("id") ON DELETE CASCADE
);

CREATE TABLE "teams"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL
);

CREATE TABLE "users"
(
    "id" SERIAL PRIMARY KEY,
    "alias" VARCHAR,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "email" VARCHAR UNIQUE,
    "phone" VARCHAR,
    "company" VARCHAR,
    "password" VARCHAR NOT NULL,
    "level" INT DEFAULT 3,
    "team_id" INT REFERENCES "teams"("id") ON DELETE CASCADE
);
CREATE TABLE "projects"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) UNIQUE NOT NULL,
    "team_id" INT REFERENCES "teams"("id") ON DELETE CASCADE,
    "workflow_id" INT REFERENCES "workflows"("id") ON DELETE CASCADE,
    "description" VARCHAR,
    "due" TIMESTAMPTZ,
    "created" TIMESTAMPTZ,
    "edited" TIMESTAMPTZ
);
CREATE TABLE "alerts"
(
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR,
    "description" VARCHAR,
    "created" TIMESTAMPTZ DEFAULT NOW(),
    "resolved" BOOLEAN DEFAULT false,
    "user_id" INT REFERENCES "users"("id") ON DELETE CASCADE
);
CREATE TABLE "capturedValues"
(
    "id" SERIAL PRIMARY KEY,
    "input_id" INT REFERENCES "inputs"("id") ON DELETE CASCADE,
    "project_id" INT REFERENCES "projects"("id") ON DELETE CASCADE,
    "fulfilled" BOOLEAN DEFAULT false,
    "value" varchar
);


----------------------------------
--INSERTION QUERIES/EXAMPLE DATA--
----------------------------------


INSERT INTO "workflows"
    ("name", "description", "team_id", "created")
VALUES
    ('Small Business/Nonprofit Development', 'a plan for small businesses and local nonprofits getting into the world of developing', 1, NOW()),
    ('Restaurant Buildout', 'a plan for interior designers working on a restaurant buildout', 1, NOW());

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
    ("type", "description", "url", "task_id")
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
    ("task_id", "type", "prompt")
VALUES
    ( 1, 'text', 'leave a note'),
    ( 3, 'text', 'leave a note'),
    ( 5, 'text', 'leave a note'),
    ( 7, 'text', 'leave a note'),
    ( 9, 'text', 'leave a note'),
    ( 11, 'text', 'leave a note'),
    ( 13, 'text', 'leave a note'),
    ( 15, 'text', 'leave a note'),
    ( 17, 'text', 'leave a note'),
    ( 19, 'text', 'leave a note'),
    ( 21, 'text', 'leave a note'),
    ( 22, 'text', 'leave a note'),
    ( 1, 'number', 'enter a number'),
    ( 2, 'number', 'enter a number'),
    ( 3, 'number', 'enter a number'),
    ( 4, 'number', 'enter a number'),
    ( 5, 'number', 'enter a number'),
    ( 6, 'number', 'enter a number'),
    ( 7, 'number', 'enter a number'),
    ( 8, 'number', 'enter a number'),
    ( 9, 'number', 'enter a number'),
    ( 10, 'button', 'click submit'),
    ( 11, 'button', 'click submit'),
    ( 12, 'button', 'click submit'),
    ( 13, 'button', 'click submit'),
    ( 14, 'button', 'click submit'),
    ( 15, 'button', 'click submit'),
    ( 16, 'button', 'click submit'),
    ( 17, 'button', 'click submit'),
    ( 18, 'button', 'click submit'),
    ( 19, 'button', 'click submit'),
    ( 20, 'button', 'click submit'),
    ( 21, 'button', 'click submit'),
    ( 22, 'button', 'click submit');

INSERT INTO "teams"
    ("name")
VALUES
    ('NEOO Partners'),
    ('SvenTeam'),
    ('Interior Design Team');

INSERT INTO "users"
    ("alias", "firstname", "lastname", "email", "password", "team_id")
VALUES
    ('DAngelos', 'DAngelos', 'Svenkeson', 'dangelos@gmail.com', 'password123', 1),
    ('Todd', 'Todd Micaiah', 'Austin', 'todd@gmail.com', 'password123', 1),
    ('Denetrick', 'Denetrick', 'Powers', 'denetrick@gmail.com', 'password123', 1),
    ('Haley', 'Haley', 'Ryan', 'haley@gmail.com', 'password123', 2),
    ('David', 'David', 'Kantor', 'david@gmail.com', 'password123', 2),
    ('Megan', 'Megan', 'Henry', 'megan@gmail.com', 'password123', 2),
    ('Corey', 'Corey', 'Barr', 'corey@gmail.com', 'password123', 2),
    ('Jon', 'Jonathan', 'Johnson', 'john@gmail.com', 'password123', 3),
    ('Emy', 'Emily', 'Emilyson', 'emily@gmail.com', 'password123', 3),
    ('Nate', 'Nathan', 'Nathan', 'nate@gmail.com', 'password123', 3);

INSERT INTO "projects"
    ("name", "team_id", "workflow_id", "description", "created")
VALUES
    ('Duck Donuts', 1, 1, 'a short or long description of the project', NOW()),
    ('Regional Acceleration Center', 1, 1, 'a short or long description of the project', NOW()),
    ('Svenplans.com', 2, 1, 'a short or long description of the project', NOW()),
    ('Skyway Remodel', 3, 2, 'a short or long description of the project', NOW());

INSERT INTO "alerts"
    ("type", "description", "user_id")
VALUES
    ('text', 'Help me i am stuck!', 1),
    ('text', 'So where do i go from here?', 2),
    ('text', 'Can you help with this task', 3);






