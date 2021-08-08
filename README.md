# Simple Command Line Tool For Tasks

This is a simple, local storage CLI for quick to-dos. The data is stored locally in a JSON file

The basic data structure of a to-do is as follows:

```js
[
  {
    "name": "Example Task",
    "dateAdded": "2021-06-08",
    "notes": "Example Notes - things to keep in mind",
    "completed": false,
    "dateCompleted": null
  }
]

```

There are some basic commands to add and update to-dos

Add a new to-do

> node cli.js new

Find all non-completed to-dos and mark them completed

> node cli mc

note: this will update the completed to true while adding today's date as the date completed

``` json
[
  {
    "name": "Example Task",
    "dateAdded": "2021-06-08",
    "notes": "Example Notes - things to keep in mind",
    "completed": true,
    "dateCompleted": "2021-08-08"
  }
]

```

View all open to-dos

> node cli.js lo

View all completed to-dos

> node cli.js lc

for more help or to see all of the available commands

> node cli.js help
