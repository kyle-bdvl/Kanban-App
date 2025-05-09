function handleCreate() {
  handleClick();
}

let ColumnArray = []; // array of column titles

function handleClick() {
  let dialog = document.createElement('dialog');
  dialog.setAttribute('class', 'inputDialog');

  dialog.innerHTML = `
    <p>Greetings, one and all!</p>
    <form method="dialog">
      <input placeholder="Title" id="Title">
      <button>OK</button>
    </form>
  `;

  document.body.appendChild(dialog); // append to body for full-screen centering
  dialog.showModal();

  dialog.addEventListener('close', () => {
    let inputTitle = document.getElementById("Title");
    let titleName = inputTitle.value.trim();

    if (titleName) {
      addingColumn(titleName);
    }

    dialog.remove();
  });
}

function addingColumn(titleName) {
  ColumnArray.push({ title: titleName, tasks: [] }); // store just the title
  renderColumns();
}
// Main function sort of 
function renderColumns() {
  let kanbanBoard = document.querySelector('.kanban');
  kanbanBoard.innerHTML = ""; // clear board

  ColumnArray.map((column, index) => {
    let col = document.createElement('div'); // FIX: create new div
    col.classList.add('column');
    col.innerHTML = `
      <div class="topCard">
        <h2>${column.title}</h2>
        <img onclick="deleteColumn(${index})"src="../Assets/trashBinIcon.png" id="trashIcon"/>
      </div>
      <div class="task" id="task-col-${index}">
      
      </div>
      <button class="create-btn" onclick="addTask(${index})">+ Add Task</button>
    `;
    kanbanBoard.appendChild(col);

    // Render Tasks inside this render Column function 
    let taskContainer = col.querySelector(`#task-col-${index}`);
    column.tasks.map((task, taskIndex) => {
      let taskDiv = document.createElement('ul');
      taskDiv.innerHTML = `
      <li>
        <div>
          <h5>${task.taskname}</h5>
          <img src="../Assets/trashBinIcon.png" id="trashIcon" onclick="deleteTask(${index}, ${taskIndex})"/>
        </div>
        <p>${task.date}</p>
      </li>
    `;
      taskContainer.appendChild(taskDiv);

    }); //inner map loop for the task
  }); // outmap for the column


}

// to manipulate the columns
function deleteColumn(index) {
  ColumnArray.splice(index, 1);
  renderColumns();
}

// function to delete the task in the column

// Adding tasks to the columns 
function addTask(columnIndex) {
  let dialog = document.createElement('dialog');
  dialog.setAttribute('class', 'inputDialog');

  dialog.innerHTML = `
    <p>Greetings, one and all!</p>
    <form method="dialog">
      <input placeholder="Taskname" id="Taskname" required/>
      <input placeholder="Date" id="date" type="Date" required/>
      <button>Submit</button>
    </form>
  `;

  document.body.appendChild(dialog); // append to body for full-screen centering
  dialog.showModal();

  dialog.addEventListener('close', () => {
    let taskname = document.getElementById("Taskname").value.trim();
    let date = document.getElementById('date').value;

    if (taskname) {
      ColumnArray[columnIndex].tasks.push({ taskname, date: date });
      renderColumns(); //re renders the columns with updated tasks
    }

    dialog.remove();
  });
}

// to delete the task individually 
function deleteTask(colIndex, TaskIndex) {
  ColumnArray[colIndex].tasks.splice(TaskIndex, 1);
  renderColumns();
}


