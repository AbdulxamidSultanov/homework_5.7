import { createTasks, createDone } from "./createElements.js";

const todo = document.getElementById("todo");
const addBtn = document.getElementById("addBtn");
const body = document.querySelector(".body");
const counterTasks = document.getElementById("counterTask");
const footer = document.querySelector(".footer");
const counterDone = document.getElementById("counterDone");

function getDataToDo() {
  let tasks = [];
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  return tasks;
}

function getDataDone() {
  let tasksDone = [];
  if (localStorage.getItem("tasksDone")) {
    tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
  }
  return tasksDone;
}

addBtn &&
  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let task = {
      id: Date.now(),
      taskName: todo.value,
    };
    let createTask = createTasks(todo.value, task.id);
    body.innerHTML += createTask;

    let tasks = getDataToDo();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    todo.value = "";
  });

document.addEventListener("DOMContentLoaded", function () {
  let tasks = getDataToDo();
  tasks.forEach((task) => {
    body.innerHTML += createTasks(task.taskName, task.id);
  });

  const deleteBtns = document.querySelectorAll(".delete-btn");
  const doneBtns = document.querySelectorAll(".done-btn");
  const tasksToAction = document.querySelectorAll(".tasks");

  deleteBtns.forEach((btn) => {
    const btnDataId = btn.getAttribute("data-id");
    btn.addEventListener("click", function () {
      tasksToAction.forEach((task) => {
        let taskDataId = task.getAttribute("data-id");
        if (btnDataId === taskDataId) {
          task.remove();
        }
        tasks = tasks.filter((data) => data.id !== Number(btnDataId));
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
    });
  });

  doneBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();

      let taskDone = {
        id: Number(btn.getAttribute("data-id")),
        taskDone: btn.getAttribute('data-name')
      };

      let tasksDone = getDataDone()
      tasksDone.push(taskDone)
      localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
    });
  });
  let tasksDone = getDataDone()

  tasksDone.forEach(done => {
    footer.innerHTML += createDone(done.taskDone)
  })
});
