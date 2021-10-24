# Simple Command Line Tool For Tasks

Local storage task CLI built with Commander

![](simple-task-cli.gif)

npm download

``` shell
> npm i udemonia-to-do
```

## For NPM package use after installing the NPM package

``` bash
$ touch cli.js
```

In the cli.js file, require the package

``` js
const toDoCLI = require('udemonia-to-do')
```

## The basic data structure of a to-do

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

## Basic To Do Commands

### Add a new to-do

``` console
> node cli.js new
```

You will be prompted for the name of the task and any notes you'd want to add

``` bash
$ node cli.js new
? To Do
? Notes
```

*Notes default to an empty string if you press enter without adding notes*

You can also skip the 'To Do' prompt by adding the name after the new command

``` console
> node cli.js new My Task Title
```

### Find all non-completed to-dos and mark them completed

``` console
> node cli.js new mc
```

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

### View all open to-dos

``` console
> node cli.js lo
```

### View all completed to-dos

``` console
> node cli.js lc
```

## Help

``` console
> node cli.js help
```

``` bash

😀 $node cli.js help
Usage: cli [options] [command]

to-do-cli

Options:
  -V, --version     output the version number
  -h, --help        display help for command

Commands:
  new|n             Add a new task to the list
  markComplete|mc   Mark a task as completed! ✅
  listAll|la        List all the tasks (open & completed)
  listCompleted|lc  List all of the completed tasks ✅
  listOpen|lo       List all the open tasks ❌
  help [command]    display help for command

```

---

## ~/.bash_profile alias

You can add an alias to your .bash_profile and run the alias from any directory

e.g.

Get the present working directory

``` console
> pwd
```

copy the present working directory, open vim or any other text editor and paste it inside the bash shell alias

``` console
> vim ~/.bash_profile
```

> alias task='node /Users/my-path-to-download/to-do-cli

Once saved, open a new terminal session and any of the commands above can be ran from any directory with the alias

e.g.

``` console
> task new my task title
```
