// Get the list element from the DOM
const taskList = document.getElementById("list");

// Add a click event listener to the "Add Task" button
addTaskButton.addEventListener("click", function () {
  // Get the task list from local storage, or create an empty array if it doesn't exist
  var storageList = JSON.parse(localStorage.getItem("lista")) || [];

  // Get the text from the input field
  const text = document.getElementById("input").value;

  // If the text is empty, null, or less than 3 characters, display an error message
  if (text == "" || text == null || text.length < 3) {
    const error = document.getElementById("error");
    error.style.display = "block";
    document.getElementById("input").style.borderColor = "red";
    error.style.color = "red";

    // Otherwise, create a new task object and add it to the storage list
  } else {
    var storageObject = {
      task: text,
      class: "unchecked",
    };
    storageList.push(storageObject);
    localStorage.setItem("lista", JSON.stringify(storageList));

    // Clear the error message and input field, and set the border color to the default color
    document.getElementById("error").style.display = "none";
    document.getElementById("input").style.borderColor = "rgb(0, 255, 251)";

    // Create a new task item element, set its class and ID to the task text, and set its innerHTML to the task text
    const taskItem = document.createElement("li");
    taskItem.className = "unchecked";
    taskItem.id = text;
    taskItem.innerHTML = text;

    // Create a new delete button element, set its innerHTML to an image of a trash can, and add it to the task item element
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML =
      '<img src="https://iconsplace.com/wp-content/uploads/_icons/ffd700/256/png/trash-icon-6-256.png"/>';
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
      // When the delete button is clicked, remove the task item element from the task list, update the number of tasks, and delete the task from local storage
      taskList.removeChild(taskItem);
      document.getElementById("numberOfTasks").innerHTML =
        document.getElementsByTagName("li").length;
      deleteTaskFromLocalStorage(taskItem.id);
      console.log(localStorage.getItem("lista"));
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  }
  document.getElementById("input").value = "";

  // Update the number of tasks and show the list items
  document.getElementById("numberOfTasks").innerHTML =
    document.getElementsByTagName("li").length;
  showListItems();
  console.log(localStorage.getItem("lista"));
});

// Add a click event listener to the task list element
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (event) {
    // If the clicked element is a task item element, toggle its "checked" class and update its class in local storage
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
      showListItems();
      changeClass(event.target.id);
    }
    console.log(localStorage.getItem("lista"));
  },
  false
);

// This function shows/hides task items based on the selected option in the filter dropdown menu
function showListItems() {
  var x = document.getElementById("filter-select").value;

  // If the filter is set to "incomplete", hide completed tasks and show incomplete ones
  if (x == "incomplete") {
    var divsToHide = document.getElementsByClassName("checked");
    var divsToShow = document.getElementsByClassName("unchecked");
    for (var i = 0; i < divsToShow.length; i++) {
      divsToShow[i].style.display = "block";
    }
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "none";
    }
  }

  // If the filter is set to "completed", hide incomplete tasks and show completed ones
  if (x == "completed") {
    var divsToHide = document.getElementsByClassName("unchecked");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "none";
    }
    var divsToShow = document.getElementsByClassName("checked");
    for (var i = 0; i < divsToShow.length; i++) {
      divsToShow[i].style.display = "block";
    }
  }
  if (x == "all") {
    // If the filter is set to "all", show all tasks
    var divsToHide = document.getElementsByClassName("unchecked");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "block";
    }
    var divsToShow = document.getElementsByClassName("checked");
    for (var i = 0; i < divsToShow.length; i++) {
      divsToShow[i].style.display = "block";
    }
  }
}
// This function changes the class of a task from checked to unchecked and vice versa in localStorage
function changeClass(taskId) {
  let Merkkijonotaulukko = localStorage.getItem("lista");
  var taulukko = JSON.parse(Merkkijonotaulukko);

  for (let i = 0; i < taulukko.length; i++) {
    if (taulukko[i].task === taskId) {
      if (taulukko[i].class === "unchecked") {
        taulukko[i].class = "checked";
      } else if (taulukko[i].class === "checked") {
        taulukko[i].class = "unchecked";
      }
    }
  }
  localStorage.removeItem("lista");
  let newStrArr = JSON.stringify(taulukko);
  localStorage.setItem("lista", newStrArr);
}

// This function deletes a task from localStorage
function deleteTaskFromLocalStorage(taskId) {
  let merkkijonotaulukko = localStorage.getItem("lista");
  let taulukko = JSON.parse(merkkijonotaulukko);
  let newArr;
  for (let i = 0; i < taulukko.length; i++) {
    if (taulukko[i].task === taskId) {
      newArr = taulukko.filter((element) => element !== taulukko[i]);
      let newStrArr = JSON.stringify(newArr);
      localStorage.setItem("lista", newStrArr);
    }
  }
}

// This function renders the tasks in the list
function renderTasks() {
  // Retrieves the task list from local storage
  const storage = localStorage.getItem("lista");
  // If the task list is empty, logs a message to the console
  if (storage === null) {
    console.log("List is empty!");
  }
  // If the task list is not empty, parses the list and adds each task to the task list in the HTML page
  else {
    const parsedList = JSON.parse(storage);

    // Loops through each task in the parsed list
    parsedList.forEach((item) => {
      // Creates a new list item element for the task and sets its class, ID, and inner HTML text
      const taskItem = document.createElement("li");
      taskItem.className = item.class;
      taskItem.id = item.task;
      taskItem.innerHTML = item.task;

      // Creates a delete button for the task and adds it to the list item element
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML =
        '<img src="https://iconsplace.com/wp-content/uploads/_icons/ffd700/256/png/trash-icon-6-256.png"/>';
      deleteButton.classList.add("delete-button");

      // Adds an event listener to the delete button that removes the task item from the task list and local storage
      deleteButton.addEventListener("click", function () {
        taskList.removeChild(taskItem);

        deleteTaskFromLocalStorage(taskItem.id);
      });

      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }
  document.getElementById("numberOfTasks").innerHTML =
    document.getElementsByTagName("li").length;
}
