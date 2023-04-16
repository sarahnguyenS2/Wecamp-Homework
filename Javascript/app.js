var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var priorityTasksHolder = document.getElementById("priority-tasks")

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label"); 
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var priorityButton = document.createElement("button");

  label.innerText = taskString;

  checkBox.type = "checkbox";
  editInput.type = "text";

  priorityButton.innerHTML = `<i class="fa-solid fa-star"></i>`;
  priorityButton.className = "priority";
  editButton.innerHTML =`<i class="fa-solid fa-pen-to-square edit"></i>`; 
  editButton.className = "edit";
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteButton.className = "delete";


  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(priorityButton);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

//Delete task.
var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//Mark task completed
var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var taskPriority = function () {
  var listItem = this.parentNode;
  console.log(listItem)
  if (listItem.parentNode.id === "incomplete-tasks") {
    priorityTasksHolder.appendChild(listItem);
    listItem.classList.add("priorityTask");
  } else if (listItem.parentNode.id === "priority-tasks") {
    incompleteTaskHolder.appendChild(listItem);
  }
  
  bindTaskEvents(listItem, taskIncomplete);
};

addButton.onclick = addTask;

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  if (!taskListItem) return; // add null check
  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  var priorityButton = taskListItem.querySelector("button.priority");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
  checkBox.onchange = function () {
    if (!this.checked) {
      taskIncomplete.call(this);
      editButton.style.display = "block";
      priorityButton.style.display = "block";
    } else {
      editButton.style.display = "none"; 
      priorityButton.style.display = "none"; 
    }
    checkBoxEventHandler.call(this);
  };

  priorityButton.onclick = taskPriority;
  
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

for (var i = 0; i < priorityTasksHolder.children.length; i++) {
  bindTaskEvents(priorityTasksHolder.children[i], taskIncomplete);
}
