// This file is just the business logic of the app.
// It doesn't know anything about the DOM or the UI.
let todolist = [];

// function loadTasksFromApi() {
//     return fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(response => response.json())
//         .then(todos => { todolist = todolist.concat(todos) });
// }

function addTask(title) {
    const id = new Date().getMilliseconds();
    todolist.push({ id, title, completed: false });
}

function removeTask(id) {
    const index = todolist.findIndex(item => item.id === id);
    todolist.splice(index, 1);
}

function toggleTask(id) {
    const index = todolist.findIndex(item => item.id === id);
    todolist[index].completed = !todolist[index].completed;
}


function clearCompleted() {
    todolist = todolist.filter(element => element.completed == false);
    renderList(todolist);


}

function toggleAllTasks() {
    const notCompleted = element => element.completed == false;
    if (todolist.some(notCompleted)) {
        todolist.forEach(item => item.completed = true);

    }
    else {
        todolist.forEach(item => item.completed = false);
    }

    renderList(todolist);
}
