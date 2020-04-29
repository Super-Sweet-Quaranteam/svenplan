# SVENPLAN 

## Description

_Duration: 3 Week Sprint_

The Svenplan app helps enterprises build customized business workflows and track those workflows' progress with more transparency and accountability. Enterprises are able to add members to their team, and those team members are then able to choose among the workflows created by their overseeing enterprise, and guide themselves through the process. 

The purpose of the beta version of this app is to develop a robust multi-step process, or workflow, generator on the enterprises' ‘admin’ side, and an intuitive workflow completion path on the team members' ‘user’ side.

To see the fully functional site, please visit: [DEPLOYED VERSION OF SVENPLAN](https://svenplan.herokuapp.com/)

## Technologies
This version uses:

- [React.js](https://reactjs.org/)
- [Express](https://expressjs.com/) 
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

A full list of dependencies can be found in `package.json`.

## Installation
1. Create a database named `svenplan_db`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries. 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

**Application Admin - Level 1**  
A level 1, Application Admin, has the greatest amount of access. 
1. Upon log in, they are able to see all of the accounts registered with the app in the *Subscribers* tab on the navigation bar. In the *Subscribers* tab, they are also able to change the level of access each user has by clicking the button in the *Permissions* column.
2. The *Create Workflow* tab in the navigation bar allows this level user to create a guided commercial process, also known as a workflow. As soon as they confirm a plan title and description, they will be routed to the *Existing Workflows* tab in the navigation bar where they can then build out the steps of that workflow.
3. In the *Existing Workflows* tab, workflow creation first looks at larger level *phases* which group similar *tasks*. The user is then walked through *task* creation, where they will be asked for a task title, task description, input type, a link to a tutorial showing how the task is to be completed, etc. Once the workflow is complete, the user will be able to publish it in order to make it available to level 2 and 3 users that have been granted access to it.

**Team Admin/Team Lead - Level 2**  
A level 2, Team Admin/Team Lead, has a moderate amount of access.  
1. Much like a level 1 Application Admin, this user has access to workflow creation, editing, and publishing.
2. Instead of being able to see all of the application's users, the level 2 user is able to see all of their level 3 Team Members.

**Team Member - Level 3**  
A level 3, Team Member, has the least amount of access.  
1. Upon login, they are able to create a new project, which is an instance of a workflow, or they can continue working on a project that already exists.
2. To create a new project, they would click the *New Project* tab in the navigation bar. This presents them with a drop-down box, which contains the workflows created by their level 1 or 2 admin, and an input box, where they would name their new project. Once they have chosen a workflow and project name, clicking the *Create Project* button will route them to the *Projects* tab in the navigation bar
3. The *Projects* tab allows the user to see an overview of their different projects, and by clicking the *Continue* button, they will be taken into that project's specific workflow, where they will be guiding themselves through the project's tasks, as laid out by their level 1 or 2 admin.

## Authors

* [Corey Barr](https://github.com/cjbarr)
* [David Kantor](https://github.com/demkantor)
* [Haley Ryan](https://github.com/haley-r)
* [Megan Henry](https://github.com/meghen)

## Acknowledgement
* Thank you to [Prime Digital Academy](https://primeacademy.io/) who equipped us with the tools needed to make this application a reality. 

* Thank you to D'Angelos Svenkeson with [Neoo Partners](https://www.neoopartners.com/) who gave us the opportunity to create this app.

