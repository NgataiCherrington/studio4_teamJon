# introAppDev-assignment-chernj1

To run the API locally, you will need it cloned to your machine, and you will also need Docker Desktop installed and open. Once you have that, you just need to take the following steps:

In the API project space, run the following commands:

npm i

If not done already.

npm run docker:run

This starts a container for a local database. On persistant machines like your home PC or the PCs in the Project room, you will not need to run this command again; you instead open Docker Desktop and click a button to spin it back up.

npm run setup:env

This copies the .env.example file into an .env file. This is where sensitive variables that tell the project where to go are stored. .env is gitignored as a matter of security, but copying the example is fine for local purposes.

npm run prisma:migrate

Pushes the schema to your Docker container.

npm run dev

Opens the API at http://localhost:3000/api/