# Finovo

## Introduction

Finovo is an open-source finance management software developed as a university project. Setting itself apart from traditional finance ledgers, Finovo offers an intuitive yet robust user experience. Tailored for small and medium-sized business owners, it addresses the common pain point of unnecessary feature bloat found in costly software solutions. Finovo is open-source and can be self-hosted on your own servers.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- React
- Express (NodeJS)
- MySQL (Database)

## Installation

1. Clone the repository.
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory
   ```bash
   cd dbms-mini-project
   ```
3. Install Dependencies
   1. Install front-end dependencies inside the finvo-client directory
   ```bash
   npm install
   ```
   2. Install back-end dependencies inside the finvo-backend directory
   ```bash
   npm install
   ```

## Usage

1. Modify the .env file in the finovo-backend directory to fill the following parameters
   ```env
   PORT=
   JWT_SECRET=
   JWT_EXPIRATION=
   ```
2. Run the queries present inside sql_scripts directory of backend in MySQL Workbench

3. Enter database credentials inside finovo-backend/db/connectDB.js

4. Start the express development server inside the finovo-backend directory

   ```bash
   npm run dev
   ```

5. Start the react development server inside the finovo-client directory
   ```bash
   npm run dev
   ```

## Contributing

If you'd like to contribute to this project, you can follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License
