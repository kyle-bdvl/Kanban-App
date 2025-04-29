function handleCreate() {
  handleClick();
}

let columns = []; // array of column titles

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
  columns.push(titleName); // store just the title
  renderColumns();
}

function renderColumns() {
  let kanbanBoard = document.querySelector('.kanban');
  kanbanBoard.innerHTML = ""; // clear board

  columns.map(title => {
    let col = document.createElement('div'); // FIX: create new div
    col.classList.add('column');
    col.innerHTML = `<h2>${title}</h2>`;
    kanbanBoard.appendChild(col);
  });
}

// to manipulate the columns 

