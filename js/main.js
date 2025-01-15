import { createTasks, createDone } from "./createElements.js";

const todo = document.getElementById("todo");
const addBtn = document.getElementById("addBtn");
const body = document.querySelector(".body");
const counterTasks = document.getElementById("counterTask");
const footer = document.querySelector(".footer");
const counterDone = document.getElementById("counterDone");

function getData() {
  let tasks = [];
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  return tasks;
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

    let tasks = getData();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    todo.value = "";
  });

document.addEventListener("DOMContentLoaded", function () {
  let tasks = getData();
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
        if(btnDataId === taskDataId){
          task.style.display = 'none'
          task.remove()
        }
      });
    });
  });
});
