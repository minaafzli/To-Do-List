"use strict;";
const btn_add = document.querySelector(".btn-add");
const new_input = document.querySelector(".new-input");
const task_list = document.querySelector(".tasksList");
const list_container = document.getElementById("list-container");
const modal_add = document.querySelector(".modal-add");
const modal_delete = document.querySelector(".modal-delete");
const modal_edit = document.querySelector(".modal-edit");
const modal_close_btn_delete = document.querySelector(
  ".modal-close-btn-delete"
);
const modal_close_btn_add = document.querySelector(".modal-close-btn-add");
const modal_close_btn_edit = document.querySelector(".modal-close-btn-edit");
const input_edit = document.querySelector(".input-edit");
const modal_delete_btn = document.querySelector(".modal-delete-btn");
const modal_cancle_btn = document.querySelector(".modal-cancle-btn");
const modal_ok_btn = document.querySelector(".modal-ok-btn");
const modal_ok_btn_edit = document.querySelector(".modal-ok-btn-edit");
const overlay = document.querySelector(".overlay");

let uncompleted_num = 0;
let completed_num = 0;

function addTask() {
  const task = new_input.value.trim();

  if (!task) {
    modal_add.classList.remove("hidden");
    overlay.classList.add("active");
    modal_ok_btn.addEventListener("click", function () {
      modal_add.classList.add("hidden");
      overlay.classList.remove("active");
    });
    modal_close_btn_add.addEventListener("click", function () {
      modal_add.classList.add("hidden");
      overlay.classList.remove("active");
    });
    overlay.addEventListener("click", function () {
      modal_add.classList.add("hidden");
      overlay.classList.remove("active");
    });
    return;
  } else {
    uncompleted_num++;
    document.querySelector(".uncomplete-num").textContent = uncompleted_num;

    const li = document.createElement("li");
    li.innerHTML = `<div class="tasks">
      <div class="checktask">
        <input type="checkbox" class="checkbox" />
        <label class="taskName">${task}</label>
      </div>
      <div class="btn-add-edit">
        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
      </div>
    </div>`;
    list_container.appendChild(li);
    new_input.value = "";

    const checkbox = li.querySelector(".checkbox");
    const checktask = li.querySelector(".checktask");

    checkbox.addEventListener("click", function () {
      checktask.classList.toggle("completed", checkbox.checked);
      if (checkbox.checked) {
        completed_num++;
        uncompleted_num--;
      } else {
        completed_num--;
        uncompleted_num++;
      }
      document.querySelector(".uncomplete-num").textContent = uncompleted_num;
      document.querySelector(".complete-num").textContent = completed_num;
    });

    const btn_delete = li.querySelector(".delete");
    const btn_edit = li.querySelector(".edit");
    const taskName = li.querySelector(".taskName");

    btn_delete.addEventListener("click", function () {
      modal_delete.classList.remove("hidden");
      overlay.classList.add("active");

      modal_delete_btn.addEventListener(
        "click",
        function () {
          li.remove();
          modal_delete.classList.add("hidden");
          overlay.classList.remove("active");

          // Update counts after deletion
          if (checktask.classList.contains("completed")) {
            completed_num--;
          } else {
            uncompleted_num--;
          }
          document.querySelector(".uncomplete-num").textContent =
            uncompleted_num;
          document.querySelector(".complete-num").textContent = completed_num;
        },
        { once: true }
      );

      modal_cancle_btn.addEventListener("click", function () {
        modal_delete.classList.add("hidden");
        overlay.classList.remove("active");
      });

      modal_close_btn_delete.addEventListener("click", function () {
        modal_delete.classList.add("hidden");
        overlay.classList.remove("active");
      });
      overlay.addEventListener("click", function () {
        modal_delete.classList.add("hidden");
        overlay.classList.remove("active");
      });
    });

    btn_edit.addEventListener("click", function () {
      modal_edit.classList.remove("hidden");
      overlay.classList.add("active");

      modal_ok_btn_edit.addEventListener("click", function () {
        const newTask = input_edit.value.trim();
        if (newTask) {
          taskName.textContent = newTask;
          input_edit.value = "";
          modal_edit.classList.add("hidden");
          overlay.classList.remove("active");
        }
      });

      modal_close_btn_edit.addEventListener("click", function () {
        modal_edit.classList.add("hidden");
        overlay.classList.remove("active");
      });

      overlay.addEventListener("click", function () {
        modal_edit.classList.add("hidden");
        overlay.classList.remove("active");
      });
    });
  }
}

// This listens to the "Add" button and calls addTask when clicked
btn_add.addEventListener("click", addTask);
