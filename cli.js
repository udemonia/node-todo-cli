#!/usr/bin/node

// install any missing modules
const program = require('commander')
const { prompt } = require('inquirer')
const { newToDoPrompts } = require('./prompts')
const { getToDos, saveToDos } = require('./utils')
const chalk = require('chalk')

// todo check for file and create it if it doesn't exist

let today = new Date().toISOString().slice(0, 10)

function checkForNullToDos(toDos) {
  if (toDos.length === 0) {
    console.log(chalk.red.bold('\nWarning....\n'))
    console.log('🤔 There are no saved tasks\n')
    console.log('✅ Add a task')
    process.exit()
  }
}

function capitalizePresentationLayer(str) {
  //? split at space character...
  const array = str.split(" ");

  //? Cap index 0 of each element in the array
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  //? join with blank space
  return array.join(" ");
}

//! Program info
program
  .version('0.0.3')
  .description('to-do-cli')

//! the New command
program
  .command('new')
  .alias('n')
  .description('Add a new task to the list')
  .action(() => {
    // let name = process.argv.join('');
    let name = process.argv.splice(3, process.argv.length - 1).join(' ')
    if (name) {
      prompt({name: 'notes', message: 'Notes'})
      .then(({notes}) => {

        //? get the toDos
        const toDos = getToDos()

        //* Lets create our new Object
        const newToDo = {
          "name": capitalizePresentationLayer(name),
          "dateAdded": today,
          "notes": notes,
          "completed": false,
          "dateCompleted": null
        }

        //? append it to our toDos
        toDos.push(newToDo)

        //? overwrite the file in the file system
        saveToDos(toDos)
        console.log('\n' + chalk.green.bold.inverse(` Added: ${name} `))
        process.exit()

      })

    } else {
      prompt(newToDoPrompts)
      .then(({toDo, notes}) => {

        //? get the toDos
        const toDos = getToDos()

        //* Lets create our new Object
        const newToDo = {
          "name": capitalizePresentationLayer(toDo),
          "dateAdded": today,
          "notes": notes,
          "completed": false,
          "dateCompleted": null
        }

        //? append it to our toDos
        toDos.push(newToDo)

        //? overwrite the file in the file system
        saveToDos(toDos)
        console.log('\n' + chalk.green.bold.inverse(` Added: ${toDo} `))
      })
    }

  })

//! Complete a task command
program
  .command('markComplete')
  .alias('mc')
  .description('Mark a task as completed! ✅')
  .action(() => {
    const AllToDos = getToDos()
    const toDos = AllToDos.filter(todo => todo.completed !== true)
    if (toDos.length === 0) {
      console.log(chalk.red.bold('\nWarning....\n'))
      console.log('🤔 There are no uncompleted tasks\n')
      console.log('✅ Add a task')
      process.exit()
    }
    prompt([
      {
        type: 'list',
        name: 'selected',
        message: 'Mark a task as completed! ✅',
        choices: toDos.map(todo => todo.name)
      }
    ])
      .then(({selected}) => {

        //? get the todo by name
        let justMyToDo = toDos.filter(todo => todo.name === selected)
        justMyToDo = justMyToDo[0];
        const updatedToDoToComplete = {
            name: justMyToDo.name,
            dateAdded: justMyToDo.dateAdded,
            notes: justMyToDo.notes,
            completed: true,
            dateCompleted: today
          }

        //? updated the completed and dateCompleted
        const updatedToDoList = AllToDos.filter(todo => todo.name != selected);
        updatedToDoList.push(updatedToDoToComplete)
        saveToDos(updatedToDoList);
        console.log(chalk.green(`${selected}\nMarked as complete ✅ `));
        console.log('')
      })
  })


//! the list All Command 
program
  .command('listAll')
  .alias('la')
  .description('List all the tasks (open & completed)')
  .action(() => {
    const toDos = getToDos()
    checkForNullToDos(toDos)
    prompt([
      {
        type: 'list',
        name: 'selected',
        message: 'Select a task to view 👀',
        choices: toDos.map(todo => todo.name)
      }
    ])
      .then(({selected}) => {
        const singleToDo = toDos.filter(todo => todo.name == selected);
        const theToDoWeCareAbout = singleToDo[0];
        const newName = capitalizePresentationLayer(theToDoWeCareAbout.name)
        console.log('')
        console.log('Name: ' + chalk.magenta(newName))
        console.log('Date Added: ' + chalk.magenta(theToDoWeCareAbout.dateAdded))
        console.log('Notes: ' + chalk.magenta(theToDoWeCareAbout.notes))
        if (theToDoWeCareAbout.completed === false) {
          console.log('Completed: ❌') 
        } else {
          console.log('Completed: ✅')
          console.log('Date Completed: ' + chalk.magenta(theToDoWeCareAbout.dateCompleted))
          console.log('')
        }
      })
  })

//! List completed Tasks
program
  .command('listCompleted')
  .alias('lc')
  .description('List all of the completed tasks ✅')
  .action(() => {
    let toDos = getToDos()
    toDos = toDos.filter(todo => todo.completed === true)
    checkForNullToDos(toDos)
    prompt([
      {
        type: 'list',
        name: 'selected',
        message: 'Select a completed task to view 👀',
        choices: toDos.map(todo => todo.name)
      }
    ])
      .then(({selected}) => {
        const singleToDo = toDos.filter(todo => todo.name == selected);
        const theToDoWeCareAbout = singleToDo[0];
        const newName = capitalizePresentationLayer(theToDoWeCareAbout.name)
        console.log('')
        console.log('Name: ' + chalk.magenta(newName))
        console.log('Date Added: ' + chalk.magenta(theToDoWeCareAbout.dateAdded))
        console.log('Notes: ' + chalk.magenta(theToDoWeCareAbout.notes))
        if (theToDoWeCareAbout.completed === false) {
          console.log('Completed: ❌') 
        } else {
          console.log('Completed: ✅')
          console.log('Date Completed: ' + chalk.magenta(theToDoWeCareAbout.dateCompleted))
          console.log('')
        }
      })
  })

//! List All Open Tasks

program
  .command('listOpen')
  .alias('lo')
  .description('List all the open tasks ❌')
  .action(() => {
    let toDos = getToDos()
    toDos = toDos.filter(todo => todo.completed !== true)
    checkForNullToDos(toDos)
    prompt([
      {
        type: 'list',
        name: 'selected',
        message: 'Select an open task to view 👀',
        choices: toDos.map(todo => todo.name)
      }
    ])
      .then(({selected}) => {
        const singleToDo = toDos.filter(todo => todo.name == selected);
        const theToDoWeCareAbout = singleToDo[0];
        const newName = capitalizePresentationLayer(theToDoWeCareAbout.name)
        console.log('\nName: ' + chalk.magenta(newName))
        console.log('Date Added: ' + chalk.magenta(theToDoWeCareAbout.dateAdded))
        console.log('Notes: ' + chalk.magenta(theToDoWeCareAbout.notes))
        if (theToDoWeCareAbout.completed == false) {
          console.log('Completed: ❌')  
        } else {
          console.log('Completed: ✅\n')  
        }
      })
  })

program.parse(process.argv)
