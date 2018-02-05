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
For the following examples, assume we have a database, ``"school"`` which has a table, ``"teacher"``.
```javascript
DatabaseApi.init();
const dbSchool = DatabaseApi.create('school');
const Teacher = dbSchool.createTable('teacher', ['name', 'room', 'officePeriod', 'subject']);
```
### Posting an Entry
```javascript
let teacherMary = {
  name: 'Mary Shippen',
  room: '7B',
  officePeriod : '3',
  subject: 'British Literature'
}
Teacher.add(teacherMary);
```
The above code would persist the following object to table, ``"teacher"``.
```javascript
{
  id: AUTOMATICALLY_GENERATED_ID,
  created_on: UNIX_TIMESTAMP,
  last_updated_on: UNIX_TIMESTAMP,
  name: 'Mary Shippen',
  room: '7B',
  officePeriod: 3,
  subject: 'British Literature'
}
```
***Note** that the fields ``"id"``, ``"created_on"``, and ``"last_updated_on"`` are auto generated and thus reserved by the system.*
### Posting Multiple Entries
You can post an array of objects to any table.
```javascript
let teacherArray = [
    {
      name: 'Mary Shippen',
      room: '7B',
      officePeriod: '3',
      subject: 'British Literature'
    },
    {
      name: 'Dev Patel',
      room: '2C',
      officePeriod: '1',
      subject: 'AP Calculus'
    },
    {
      name: 'Harold Feltch',
      room: '6A',
      officePeriod: '5',
      subject: 'Civics'
    }
  ];
Teacher.seed(teacherArray);
```
All three objects would be added to the table and given ``ids`` and ``timestamps`` accordingly.
### Fetching Entries
There are two ways to fetch and entry, by ``id`` or by ``key``.
```javascript
Teacher.fetch(2);
// {
      id: 2,
      created_on: 1213787327165,
      last_updated_on: 1414786657168,
      name: 'Dev Patel',
      room: '2C',
      officePeriod: '1',
      subject: 'AP Calculus'
    }
```
When fetching an entry by key, you must pass an existing *key-value pair*.
```javascript
Teacher.fetchByKey('name', 'Dev Patel');
// [
      {
        id: 2,
        created_on: 1213787327165,
        last_updated_on: 1414786657168,
        name: 'Dev Patel',
        room: '2C',
        officePeriod: '1',
        subject: 'AP Calculus'
      }
    ]
```
Notice that the ``fetchByKey`` method returns an array of objects.  This is due to the possibilty of mutliple entries that match the key-value pair passed.  ``fetch`` simply returns a single object since ``ids`` are always the primary key and thus unique.
Finally, the ``fetchAll`` method does just that!
```javascript
Teacher.fetchAll();
//[
    {
      id: 1,
      created_on: 1213527327165,
      last_updated_on: 1213527327165,
      name: 'Mary Shippen',
      room: '7B',
      officePeriod: '3',
      subject: 'British Literature'
    },
    {
      id: 2,
      created_on: 1213787327165,
      last_updated_on: 1414786657168,
      name: 'Dev Patel',
      room: '2C',
      officePeriod: '1',
      subject: 'AP Calculus'
    },
    {
      id: 3,
      created_on: 1313787327165,
      last_updated_on: 1314786657168,
      name: 'Harold Feltch',
      room: '6A',
      officePeriod: '5',
      subject: 'Civics'
    }
  ];
 ```
 ### Updating Entries
 You can update entries by either ``id`` or by key-value pair.  
 ```javascript
 let nextSemester = {
  room: '5B',
  subject: 'World History',
  officePeriod: '1'
 };
 Teacher.update(3, nextSemester);
 // {
      id: 3,
      created_on: 1313787327165,
      last_updated_on: 1517791669467,
      name: 'Harold Feltch',
      room: '5B',
      officePeriod: '1',
      subject: 'World History'
    }
  ```
  The ``updateByKey`` method can be used to update all entries with ``"officePeriod" : '1'``.
  ```javascript
  Teacher.updateByKey('officePeriod', '1', {officePeriod: '2'});
  Teacher.fetchByKey('name', 'Harold Feltch')[0].officePeriod = '2';
  // true
  Teacher.fetch(2).officePeriod = '2';
  // true
  ```
