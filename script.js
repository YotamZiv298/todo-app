var taskNum = 1;
var subTaskNum = 1;

function addTask() {
    let inputTaskValue = document.getElementById("inputTask").value;
    if (inputTaskValue == "") {
        alert("You must write something");
        return;
    }
    document.getElementById("inputTask").value = "";

    let body = document.getElementsByTagName("body")[0];

    if (taskNum == 1) {
        var tbl = document.createElement("table");
        tbl.setAttribute("id", "tasksTable")
        //tbl.setAttribute("border", "1");
        tbl.setAttribute("cellpadding", "10");

        body.appendChild(tbl);
    } else {
        var tbl = document.getElementById("tasksTable");
    }

    let tr = document.createElement("tr");

    for (let i = 0; i < 5; i++) {
        let td = document.createElement("td");
        tr.appendChild(td)
    }

    let checkBoxCompleteTask = document.createElement("input");
    checkBoxCompleteTask.setAttribute("type", "checkbox");
    checkBoxCompleteTask.setAttribute("onchange", "completeTask(this.className)");

    let inputTaskTxt = document.createElement("input");
    inputTaskTxt.setAttribute("readonly", true);
    inputTaskTxt.setAttribute("type", "text");
    inputTaskTxt.setAttribute("value", inputTaskValue);

    let buttonEditTask = document.createElement("button");
    buttonEditTask.textContent = "Edit";
    buttonEditTask.setAttribute("onclick", "editTask(this.className)");

    let inputSubTaskTxt = document.createElement("input");
    inputSubTaskTxt.setAttribute("id", "inputSubTask" + subTaskNum);
    inputSubTaskTxt.setAttribute("type", "text");
    inputSubTaskTxt.setAttribute("placeholder", "Add subtask...");

    let buttonAddSubTask = document.createElement("button");
    buttonAddSubTask.textContent = "Add Sub Task";
    buttonAddSubTask.setAttribute("onclick", "addSubTask(this.className)");

    let buttonRemoveTask = document.createElement("button");
    buttonRemoveTask.textContent = "Remove";
    buttonRemoveTask.setAttribute("onclick", "removeTask(this.className)");

    tr.cells[0].appendChild(checkBoxCompleteTask);
    tr.cells[1].appendChild(inputTaskTxt);
    tr.cells[2].appendChild(buttonEditTask);

    tr.cells[3].appendChild(inputSubTaskTxt);
    tr.cells[3].appendChild(buttonAddSubTask);

    tr.cells[4].appendChild(buttonRemoveTask);

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < tr.cells[i].children.length; j++) {
            tr.cells[i].children[j].setAttribute("class", "task" + taskNum);
        }
    }

    tbl.appendChild(tr);
    taskNum++;
}

function completeTask(className) {
    let task = document.getElementsByClassName(className);
    let chckbxTaskComplete = task[0];
    let inputTask = task[1];

    if (chckbxTaskComplete.checked) {
        inputTask.setAttribute("style", "text-decoration: line-through;");
    } else {
        inputTask.removeAttribute("style");
    }
}

function editTask(className) {
    let task = document.getElementsByClassName(className);
    let inputTask = task[1];
    let buttonEditTask = task[2];

    if (buttonEditTask.innerHTML == "Edit") {
        inputTask.removeAttribute("readonly");
        buttonEditTask.innerHTML = "Stop Editing";
    } else {
        inputTask.setAttribute("readonly", true);
        buttonEditTask.innerHTML = "Edit";
    }
}

function addSubTask(className) {
    let inputSubTaskValue = document.getElementById("inputSubTask" + subTaskNum).value;
    if (inputSubTaskValue == "") {
        alert("You must write something!");
        return;
    }
    document.getElementById("inputSubTask" + subTaskNum).value = "";

    let tdParent = document.getElementsByTagName("tr")[subTaskNum][3];

    if (subTaskNum == 1) {
        var tbl = document.createElement("table");
        tbl.setAttribute("id", "subTasksTable")
        tbl.setAttribute("cellpadding", "5");

        tdParent.appendChild(tbl);
    } else {
        var tbl = document.getElementById("subTasksTable");
    }

    let tr = document.createElement("tr");

    for (let i = 0; i < 3; i++) {
        let td = document.createElement("td");
        tr.appendChild(td)
    }

    let checkBoxCompleteSubTask = document.createElement("input");
    checkBoxCompleteSubTask.setAttribute("type", "checkbox");
    checkBoxCompleteSubTask.setAttribute("onchange", "completeTask(this.className)");

    let inputSubTaskTxt = document.createElement("input");
    inputSubTaskTxt.setAttribute("readonly", true);
    inputSubTaskTxt.setAttribute("type", "text");
    inputSubTaskTxt.setAttribute("value", inputSubTaskValue);

    let buttonEditSubTask = document.createElement("button");
    buttonEditSubTask.textContent = "Edit";
    buttonEditSubTask.setAttribute("onclick", "editTask(this.className)");

    tr.cells[0].appendChild(checkBoxCompleteSubTask);
    tr.cells[1].appendChild(inputSubTaskTxt);
    tr.cells[2].appendChild(buttonEditSubTask);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < tr.cells[i].children.length; j++) {
            tr.cells[i].children[j].setAttribute("class", "task" + subTaskNum);
        }
    }

    tbl.appendChild(tr);
    taskNum++;

}

function removeTask(className) {
    let tbl = document.getElementById("tasksTable");
    //let tr = document.getElementByClassName(className);
    let task = document.getElementsByClassName(className);

    for (let i = 0; i < task.length; i++) {
        tbl.removeChild(task[i]);
    }
    //tbl.removeChild(task[i]);
}

function search() {
    let input = document.getElementById("inputSearch");
    let filter = input.value.toUpperCase();
    let td;
    let txtValue;
    try {
        var table = document.getElementById("tasksTable");
        var tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.children[0].value;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    } catch (error) {
    }
}