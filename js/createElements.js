export const createTasks = (task, id) => {
  
  return `
        <div class="tasks" data-id="${id}">
          <p id="toDoTask">${task}</p>
          <div class="btns">
            <button data-id="${id}" class="done-btn"><img src="img/Check.svg" alt="" /></button>
            <button data-id="${id}" class="delete-btn"><img src="img/delete.svg" alt="" /></button>
          </div>
        </div>
    `;
};

export const createDone = (done) => {
  return `
    <div class="done">
          <p>${done}</p>
    </div>
  `;
};
