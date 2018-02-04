# Local Vault
### Transform your localStorage into a relational database.
## Getting Started
## Database Creation and Development
### Creating a Database
*Creating a database named "school" using the DatabaseApi utility from <strong>Getting Started</strong>*
```javascript
DatabaseApi.init();
DatabaseApi.create('school');
```
### Fetching a Database
*Creating database "school" and then assigning a variable to it.*
```javascript
DatabaseApi.create('school');
const database = DatabaseApi.fetch('school');
```
Alternatively, you could combine Database creation and fetching in one line with:
```javascript
const database = DatabaseApi.create('school');
```
### Listing all Existing Databases
*Assuming Local Vault currently has databases named "larry", "curly", and "moe".*
```javascript
const databaseNames = DatabaseApi.list();
// ['larry', 'curly, 'moe']
```
### Removing a Database
*Deleting database "office"*
```javascript
DatabaseApi.destroy('office');
```
Therefore...
```javascript
DatabaseApi.fetch('office');
// throw new Error()
```
### Removing all Databases
```javascript
DatabaseApi.destroyAll();
```
**Please Note** *that after you run ``DatabaseApi.destoryAll()`` you must run ``DatabaseApi.init()`` before you utilize any of **Local Vault's** functionality, otherwise an error will be thrown.*
## Database Methods
To get started, assume we create a database called "school".
```javascript
const dbSchool = DatabaseApi.create('school');
```
### Creating a Table
*The <strong>createTable</strong> method accepts to parameters; the table name and the table's schema.  The schema is a simple array outlining the table's keys.  Note that the primary key, "id", is automatically applied to the table.  A unique id is automatically added to each new table entry.*
```javascript
const Teacher = dbSchool.createTable('teacher', ['name', 'email', 'phone', 'subject', 'officeHours']);
```
### Fetching a Table
```javascript
const Teacher = dbSchool.fetchTable('teacher');
```
### Listing all Tables
```javascript
dbSchool.listTables();
// ['teacher', 'student', 'lesson', 'test'];
```
### Dropping Tables
*A single table...*
```javascript
dbSchool.dropTable('teacher');
```
*All tables...*
```javascript
dbSchool.dropTables();
```
## Table Methods
