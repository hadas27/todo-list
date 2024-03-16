// get reference to the input field
const newTodoInput = document.getElementsByClassName('new-todo')[0];
const list = document.getElementsByClassName('todo-list')[0];
const active = document.getElementById('active')
const completed = document.getElementById('completed')
const all = document.getElementById('all')
const clearComp = document.getElementById('clear-comp')
const count = document.getElementsByClassName('todo-count')[0]
const toggleAll = document.getElementsByClassName('toggle-all')[0]
const footer = document.getElementsByClassName("footer")[0]

toggleAll.addEventListener('click', toggleAllTasks)




active.addEventListener('click', displayActive);
completed.addEventListener('click', displaycompleted);
all.addEventListener('click', renderAllList);
clearComp.addEventListener('click', clearCompleted);


function renderAllList() {
    all.className = 'selected';
    completed.classList.remove('selected');
    active.classList.remove('selected');
    renderList(todolist);
}

function renderList(relevantList) {

    list.innerHTML = ''; // Clear current list

    //control the 'hidden' status of footer
    if (todolist.length !== 0) {
        footer.classList.remove('hidden');
    }
    else {
        footer.classList.add('hidden');
    }
    //control the 'hidden' status of clear completed button
    if (todolist.some(element => element.completed == true)) {
        clearComp.classList.remove('hidden');
    }

    else {
        clearComp.classList.add('hidden');

    }

    // Iterate over each task in the provided list
    relevantList.forEach(function (item) {
        const li = document.createElement('li'); // Create list item for each task

        // Add 'completed' class if task is completed
        if (item.completed == true) {
            li.classList.add('completed')
        }
        const div = document.createElement('div');
        div.className = 'view';

        // Double click to edit a task
        li.addEventListener('dblclick', function () { li.classList.add('editing'); editInput.focus() })


        // Click outside to stop editing
        document.addEventListener('click', function (event) {

            if (!li.contains(event.target)) {
                li.classList.remove('editing');
                label.textContent = editInput.value;

            }
        });

        const toggleInput = document.createElement('input');
        toggleInput.className = 'toggle';
        toggleInput.type = 'checkbox';
        toggleInput.checked = item.completed;


        // Toggle task completion
        toggleInput.addEventListener('change', function () {
            if (this.checked) {
                toggleTask(item.id);
                li.classList.add('completed');
                clearComp.classList.remove('hidden')
            }

            if (!this.checked) {
                toggleTask(item.id);
                li.classList.remove('completed');
                // Check if any completed tasks are left
                const completedItems = todolist.filter(element => element.completed == true)
                if (completedItems.length == 0) {
                    clearComp.classList.add('hidden')
                }
            }
            // Update active task count
            activeItems = todolist.filter(element => element.completed == false);
            count.innerText = `${activeItems.length} items left`;



        });

        const label = document.createElement('label');
        label.textContent = item.title;

        const button = document.createElement('button');
        button.className = 'destroy';
        // Remove task on click
        button.addEventListener('click', function () {
            removeTask(item.id);
            renderList(todolist);
        }
        );

        // Append elements to DOM
        div.appendChild(toggleInput);
        div.appendChild(label);
        div.appendChild(button);
        list.appendChild(li);
        li.appendChild(div);

        // Input for editing a task
        const editInput = document.createElement('input');
        editInput.className = 'edit';
        editInput.value = li.innerText;

        editInput.addEventListener('keydown', function edit(e) {
            if (e.key === 'Enter') {
                li.classList.remove('editing');
                label.textContent = editInput.value;

            }
        })

        li.appendChild(editInput);


        // Update active task count
        let activeItems = todolist.filter(element => element.completed == false);
        count.innerText = `${activeItems.length} items left`;


    });
}

function displayActive() {
    active.className = 'selected';
    completed.classList.remove('selected');
    all.classList.remove('selected');



    const activeList = todolist.filter(item => item.completed == false);
    renderList(activeList);
}

function displaycompleted() {
    completed.className = 'selected';
    all.classList.remove('selected');
    active.classList.remove('selected');

    const completedList = todolist.filter(item => item.completed == true);
    renderList(completedList);
}





// Response to user input when they press enter
newTodoInput.addEventListener('keydown', function addItemListener(e) {
    if (e.key === 'Enter') {
        addTask(newTodoInput.value);
        renderList(todolist);
        newTodoInput.value = ''
    }
}
);

