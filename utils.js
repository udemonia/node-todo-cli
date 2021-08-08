const fs = require('fs')
const path = require('path')

const ToDoLocation = path.join(__dirname, 'toDos.json')
const getToDos = () => JSON.parse(fs.readFileSync(ToDoLocation))
const saveToDos = (toDos) => fs.writeFileSync(ToDoLocation, JSON.stringify(toDos, null, 2))


module.exports = {ToDoLocation, getToDos, saveToDos}