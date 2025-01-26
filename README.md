## Getting Started

1. install all dependencies:

Open terminal then run

```bash
npm install
```

2. Install MySQL Locally

MacOS:

```bash
brew install mysql
```

Windows:

```bash
 Install MySQL using MySQL Installer
```

3.  Log in to MySQL:

```bash
mysql -u root -p
```

then enter your password

4.  Create a database:

```bash
CREATE DATABASE my_database;
```

5.  Add your MySQL connection string to .env file:

```bash
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

username - your username(usually "root"),
password - your password,
database_name - name of your created database

6.  Run Prisma migrations to create the table in the database:

```bash
npx prisma migrate dev --name init
```

7.  Run server:

```bash
npm run dev
```
