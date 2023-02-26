addTaskButton.addEventListener("click", function () {
    const text = document.getElementById("input").value;
    const taskList = document.getElementById("list");
    if (text == "" || text == null || text.length < 3) {
        const error = document.getElementById("error");
        error.style.display = 'block';
        document.getElementById("input").style.borderColor = "red";
        error.style.color = "red";
    }
    else {
        document.getElementById("error").style.display = 'none';

        document.getElementById("input").style.borderColor = "rgb(0, 255, 251)";

        const taskItem = document.createElement("li");
        taskItem.className = 'unchecked';
        taskItem.innerHTML = text;


        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<img src="https://iconsplace.com/wp-content/uploads/_icons/ffd700/256/png/trash-icon-6-256.png"/>';
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
            document.getElementById("numberOfTasks").innerHTML = document.getElementsByTagName("li").length;
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
    document.getElementById("input").value = "";
    document.getElementById("numberOfTasks").innerHTML = document.getElementsByTagName("li").length;
    showListItems();
});
var list = document.querySelector('ul');
list.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        showListItems();
    }
}, false
);

function showListItems() {
    var x = document.getElementById("filter-select").value;

    if (x == "incomplete") {
        var divsToHide = document.getElementsByClassName("checked"); //divsToHide is an array
        var divsToShow = document.getElementsByClassName("unchecked"); //divsToHide is an array
        for (var i = 0; i < divsToShow.length; i++) {
            divsToShow[i].style.display = "block";
        }
        for (var i = 0; i < divsToHide.length; i++) {
            divsToHide[i].style.display = "none";
        }
    }
    if (x == "completed") {
        var divsToHide = document.getElementsByClassName("unchecked"); //divsToHide is an array
        for (var i = 0; i < divsToHide.length; i++) {
            divsToHide[i].style.display = "none"
        }
        var divsToShow = document.getElementsByClassName("checked"); //divsToHide is an array
        for (var i = 0; i < divsToShow.length; i++) {
            divsToShow[i].style.display = "block"
        }
    }
    if (x == "all") {
        var divsToHide = document.getElementsByClassName("unchecked"); //divsToHide is an array
        for (var i = 0; i < divsToHide.length; i++) {
            divsToHide[i].style.display = "block";
        }
        var divsToShow = document.getElementsByClassName("checked"); //divsToHide is an array
        for (var i = 0; i < divsToShow.length; i++) {
            divsToShow[i].style.display = "block";
        }
    }
}