# Local Vault

### Transform your localStorage into a relational database.

## What is Local Vault?
**Local Vault** is a light weight ORM that allows you to build, develop, and access relational databases in your ``localStorage``.  You can create multiple databases, tables, and relationships such as ``hasMany`` or ``oneToOne``.  All database data is encoded into a base-64 string and persisted to ``window.localStorage.localVault``.

Local Vault is super easy to set up and can be used in conjunction with any front end framework.  This tool can be used either for development or production, depending on the scale and particulars of your project.

## Table of Contents
* [Getting Started](#getting-started)
* [Database Creation and Development](#database-creation-and-development)
* [Database Methods](#database-methods)
* [Table Methods](#table-methods)
* [Debugging](#debugging)
* [Contributing](#contributing)
* [License](#license)

## Getting Started
```bash
npm install local-vault --save-dev
```
On the front end just ``import`` the **Local Vault** Database ORM
```javascript
import LocalVault from 'local-vault';
```

## Database Creation and Development

### Creating a Database
Creating a database named ``"school"`` using the LocalVault Database ORM utility from **Getting Started**
```javascript
LocalVault.init();
LocalVault.create('school');
```

### Fetching a Database
Creating database ``"school"`` and then assigning a variable to it.
```javascript
LocalVault.create('school');
const database = LocalVault.fetch('school');
```
Alternatively, you could combine Database creation and fetching in one line with:
```javascript
const database = LocalVault.create('school');
```

### Confirming a Database's Existence
There are two ways to find out whether or not a database exists.
1. Using ``fetch()``
```javascript
const database = LocalVault.fetch('school');
// =>
instanceof Database()

const database = LocalVault.fetch('vacation');
// =>
false
```
2. Using ``doesExist()``
```javascript
const databaseExists = LocalVault.doesExist('school');
// =>
true

const databaseExists = LocalVault.doesExist('vacation');
// =>
false
```

### Listing all Existing Databases
Assuming Local Vault currently has databases named ``"larry"``, ``"curly"``, and ``"moe"``.
```javascript
let databaseNames = LocalVault.list();

// =>
  ['larry', 'curly', 'moe']
```

### Removing a Database
Deleting database ``"office"``
```javascript
LocalVault.destroy('office');
```
Therefore...
```javascript
LocalVault.fetch('office');

// =>
  false
```

### Removing all Databases
```javascript
LocalVault.destroyAll();
```
**Please Note** *that after you run ``LocalVault.destoryAll()`` you must run ``LocalVault.init()`` before you utilize any of **Local Vault's** functionality, otherwise an error will be thrown.*

## Database Methods
To get started, assume we create a database called ``"school"``.
```javascript
const dbSchool = LocalVault.create('school');
```

### Creating a Table
The ``createTable`` method accepts to parameters; the *table name* and the *table's schema*.  The schema is a simple array outlining the table's keys.  Note that the primary key, ``"id"``, is automatically applied to the table.  A unique id is automatically added to each new table entry.
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

// => 
  ['teacher', 'student', 'lesson', 'test'];
```

### Dropping Tables
A single table...
```javascript
dbSchool.dropTable('teacher');
```
All tables...
```javascript
dbSchool.dropTables();
```

## Table Methods
For the following examples, assume we have a database, ``"school"`` which has a table, ``"teacher"``.
```javascript
LocalVault.init();
const dbSchool = LocalVault.create('school');
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

// =>
  {
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

// =>
  [
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

// =>
  [
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
 // =>
  {
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
  Teacher.fetchByKey('name', 'Harold Feltch')[0].officePeriod === '2';
  
  // =>
    true
  Teacher.fetch(2).officePeriod === '2';
  
  // =>
    true
  ```
### Establishing Relationships
Currently, Local Vault only supports Has-Many type relationships.  There are plans to eventually add One-To-One and Many-To-Many.

Consider the following example where we add a table to keep track of students to the ``school`` database.
```javascript
const Student = School.createTable('student', ['firstName', 'lastName', 'gender', 'grade']);
```
Since a teacher typically has many students, we can establish a Has-Many relationship between the ``Teacher`` and ``Student`` tables.
We can do so by passing the instantiated ``Table`` class or table name as a string into the ``hasMany()`` class method.
```javascript
Teacher.hasMany(Student);
// or
Teacher.hasMany('student');
```
Establishing this relationship has **two major implications:**
* The ``Student`` table now has a ``teacherId`` field added to its schema.  The ``teacherId`` is essentially a foreign key that relates to the primary key (``id`` field) of the ``Teacher`` table.
* When entries are fetched from the ``Teacher`` table, they will have a ``students`` field, which points to an array of ``Student`` entries whose related foreign key(s) match the pulled ``Teacher`` primary key(s).  See the example below.
```javascript
let students = [
    {
      firstName: 'Margaret',
      lastName: 'Sands',
      grade: '10',
      gender: 'female',
      teacherId: 1
    },
    {
      firstName: 'Jeff',
      lastName: 'Becker',
      grade: '9',
      gender: 'male',
      teacherId: 2
    },
   {
      firstName: 'Katie',
      lastName: 'Li',
      grade: '6',
      gender: 'female',
      teacherId: 3
    },
    {
      firstName: 'Abdullah',
      lastName: 'Jawad',
      grade: '10',
      gender: 'male',
      teacherId: 1
    },
    {
      firstName: 'Amalie',
      lastName: 'Danner',
      grade: '9',
      gender: 'female',
      teacherId: 2
    },
    {
      firstName: 'Kent',
      lastName: 'Osburne',
      grade: '6',
      gender: 'male',
      teacherId: 3
    },
    {
      firstName: 'Brit',
      lastName: 'Wixley',
      grade: '10',
      gender: 'female',
      teacherId: 1
    },
  ]

Student.seed(students)

Teacher.fetch(1)

// => 
  { id: 1,
    created_on: 1519066685687,
    last_updated_on: 1519066685687,
    name: 'Mary Shippen',
    room: '7B',
    officePeriod: '3',
    subject: 'British Literature',
    students: 
     [ { id: 1,
         created_on: 1519066685699,
         last_updated_on: 1519066685699,
         firstName: 'Margaret',
         lastName: 'Sands',
         grade: '10',
         gender: 'female',
         teacherId: 1 },
       { id: 4,
         created_on: 1519066685712,
         last_updated_on: 1519066685712,
         firstName: 'Abdullah',
         lastName: 'Jawad',
         grade: '10',
         gender: 'male',
         teacherId: 1 },
       { id: 7,
         created_on: 1519066685729,
         last_updated_on: 1519066685729,
         firstName: 'Brit',
         lastName: 'Wixley',
         grade: '10',
         gender: 'female',
         teacherId: 1 } 
      ] 
  }
```

### Removing Entries
You can remove an entry either by ``id`` or key-value pair.
```javascript
Teacher.remove(3);
// Removes Harold Feltch from the Teacher table
```
```javascript
Student.removeByKey('gender', 'female');
// Removes all female students
```
An entire table's entries can be flushed via:
```javascript
Student.removeAll();
```

## Debugging
You can turn on **debug mode** when initializing ``LocalVault``.
```javascript
LocalVault.init('debug');
```
Alternatively, you can switch **debug mode** on and off via the following methods, respectively.
```javascript
LocalVault.debugOn();

LocalVault.debugOff();
```

## Contributing
Contributing should be directed toward a specific issue.
#### Fork the Repo

#### Clone the Repo
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/local-vault.git
```

#### NPM Install
```bash
npm install
```

#### Create a branch off of ``master`` to address an issue
```bash
git checkout -b 'feature/issue-ISSUE_NUMBER'
```
for example:
```bash
git checkout -b 'feature/issue-9'
```

#### Make changes and Commit Code
```bash
git add .
git commit -m 'thoughtful, concise, high level outline of change'
```

#### Push into Your Branch
```bash
git push origin feature/issue-ISSUE_NUMBER
```

#### Create a Pull Request and tag the relevant issue(s) in that request

And that's it!  Thanks for contributing! :tada: :tada: :tada:

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
