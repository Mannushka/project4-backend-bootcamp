# Food harbour app: back-end

Food Harbour is a comprehensive online platform that serves as a catalogue of local restaurants in Hong Kong. It is designed to help customers find the best dining option based on their budget, preferred location, specific food preferences and restairant's rating. The app also provides its users with an opportunity to rate restaurants and leave a feedback for a particular restaurant as well as view the reviews written by others.

## Setup

1. Clone the repository to your local machine.
2. Open the terminal, navigate to the root directory of the project and run "npm install".
3. Create a .env file in the root directory of the project. Set the following environmental variables in the .env file:

DB_USERNAME=your_database_username
DB_NAME=your_database_name
DB_HOST=your_database_host
DB_DIALECT=your_database_dialect

AUDIENCE=your_auth0_audience
ISSUER_BASE_URL=your_auth0_issuer_base_url
Replace your_database_username, your_database_name, your_database_host, and your_database_dialect with the appropriate values for your Postgres database configuration. Similarly, replace your_auth0_audience and your_auth0_issuer_base_url with the corresponding values from your Auth0 configuration.

4. Once the dependencies and environmental variables are set, navigate to the root directory of the project in the terminal and start the backend server by running "npm start" .

### Postgress database setup:

Install and set up Postgres on your machine, ensuring that it matches the configuration provided in the .env file.
To set up the Postgres database, open the terminal, navigate to the root directory of the project and run "npx sequelize-cli db:migrate".

### Auth0 configuration:

1.  Set up an Auth0 account and create a new application at https://auth0.com .
2.  Configure the application with the appropriate domain, client ID, and audience.
3.  Update the AUDIENCE and ISSUER_BASE_URL variables in the .env file with the corresponding values from your Auth0 configuration.
4.  Ensure that you use the same Auth0 credentials (domain, client ID, etc.) in both the frontend and backend of your application to maintain consistency

## Built with

![Static Badge](https://img.shields.io/badge/node.js-%23a2c11c?style=for-the-badge&logo=node.js&logoColor=%23a2c11c&labelColor=black&color=%23a2c11c) ![Static Badge](https://img.shields.io/badge/express.js-%23ffef6f?style=for-the-badge&logo=express&logoColor=%20%23ffef6f&labelColor=black&color=%20%23ffef6f) ![Static Badge](https://img.shields.io/badge/postgreSQL-%23005792?style=for-the-badge&logo=postgresql&logoColor=%20%2300bbf0&labelColor=black&color=%23005792) ![Static Badge](https://img.shields.io/badge/sequelize-%23ff9c6d?style=for-the-badge&logo=sequelize&logoColor=%23ff9c6d&labelColor=black&color=%23ff9c6d)
