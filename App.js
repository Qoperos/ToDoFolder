function time() {

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date();
    const mont = months[date.getMonth()];
    const day = date.getDate();
    const week = weeks[date.getDay()];
    var hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const session = document.getElementById("session");


    if (hrs >= 12) {
        session.innerHTML = "PM";
    } else {
        session.innerHTML = "AM";
    }

    if (hrs > 12) {
        hrs -= 12;
    }
    if (hrs <= 0) {
        hrs = 12;
    }

    document.getElementById("month").innerHTML = mont;
    document.getElementById("dayNum").innerHTML = day;
    document.getElementById("day").innerHTML  = week;
    document.getElementById("hour").innerHTML = hrs;
    document.getElementById("minute").innerHTML = min;
    document.getElementById("second").innerHTML = sec;
}
setInterval(time, 10);

window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector("#name");
    
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })


    document.getElementById("logBtn").onclick = function () {
        document.getElementById("popForm").style.display = "block";
        const logInput = document.querySelector("#logInput");
        document.getElementById("title").value = logInput.value;
    }
    document.getElementById("close").onclick = function () {
        document.getElementById("popForm").style.display = "none";
    }

    const createBackLog = document.querySelector('#new-todo-form');
    createBackLog.addEventListener('submit', e => {
        e.preventDefault();
        
        const backLogToDo = {
            title: e.target.elements.title.value,
            deadline: e.target.elements.deadline.value,
            subtask: e.target.elements.subtask.value,
            taskOne: e.target.elements.taskOne.value,
            taskTwo: e.target.elements.taskTwo.value
        }

        todos.push(backLogToDo);

        localStorage.setItem('todos', JSON.stringify(todos));
        e.target.reset();
        DisplayBacklog();
        
    })

    DisplayBacklog();
});

function DisplayBacklog() {

    const log = document.querySelector("#log");

    log.innerHTML = "";

    todos.forEach(backLogToDo => {

        const logData = document.createElement('div');
        const content = document.createElement('div');
        const action = document.createElement('div');
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const addToDo = document.createElement('button');

        logData.classList.add('logData');
        content.classList.add('content');
        action.classList.add('actions');
        edit.classList.add('edit');
        deleteBtn.classList.add('delete');
        addToDo.classList.add('addToDo');

        content.innerHTML = `<input type ="text" class="text" value ="${backLogToDo.title}">`;
        edit.innerHTML = "Edit";
        deleteBtn.innerHTML = "Delete";
        addToDo.innerHTML = "Add";


        logData.appendChild(content);
        action.appendChild(edit);
        action.appendChild(deleteBtn);
        action.appendChild(addToDo);
        logData.appendChild(action);

        log.appendChild(logData);

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                backLogToDo.title = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayBacklog();
            })
        })

        deleteBtn.addEventListener('click', e => {
                
            todos = todos.filter(t => t != backLogToDo);
            localStorage.setItem("todos", JSON.stringify(todos));
            DisplayBacklog();

        })

        addToDo.addEventListener('click', e => {
            const todoList = document.querySelector('#todoList');

            todoList.innerHTML = "";
                        
                const toData = document.createElement('div');
                const titleH4 = document.createElement('h4');
                const iterationH5 = document.createElement('h5');
                const deadlineH5 = document.createElement('h5');
                const task1 = document.createElement('h5');
                const task2 = document.createElement('h5');
                // const task3 = document.createElement('h5');
                const iterationForm = document.createElement('form');
                const addPlus = document.createElement('button');
                // const addIcon = document.createElement('i');
                const iterationTask = document.createElement('div');
                
                titleH4.innerHTML = `Title : ${backLogToDo.title}`;
                iterationH5.innerHTML = `Iteration name : ${backLogToDo.subtask}`;
                deadlineH5.innerHTML = `Deadline : ${backLogToDo.deadline}`;
            task1.innerHTML = `Task 1 : ${backLogToDo.taskOne}`;
            task2.innerHTML = `Task 2 : ${backLogToDo.taskTwo}`;

                toData.setAttribute('draggable', true);
                addPlus.type = 'submit';
                addPlus.setAttribute('id', 'addPlus');
                
                iterationForm.setAttribute('id', 'iteration');
                addPlus.innerHTML = `<i class="fas fa-plus"></i>`;
                iterationForm.innerHTML = `<input type="text" id="addition" name="additional" value='' placeholder="Add iteration's todo ...">`;
                iterationTask.setAttribute('id', 'iterationTask');

                toData.classList.add('toDoData');
                addPlus.classList.add('add-Plus');


                toData.appendChild(titleH4);
                toData.appendChild(iterationH5);
            toData.appendChild(deadlineH5);
            toData.appendChild(task1);
            toData.appendChild(task2);
                iterationForm.appendChild(addPlus);
                todoList.appendChild(toData);     
                
            
                const draggableCard = document.querySelector('.toDoData');
                const containers = document.querySelectorAll('.conta');
                
                draggableCard.addEventListener('dragstart', () => {
                    draggableCard.classList.add('dragging');
                })
                
                draggableCard.addEventListener('dragend', () => {
                draggableCard.classList.remove('dragging');
                })
                
                containers.forEach(conta => {
                conta.addEventListener('dragover', e => {
                    e.preventDefault();

                    const draggable = document.querySelector('.dragging');
                    conta.appendChild(draggable);
                })
            })
        })
    })
}

