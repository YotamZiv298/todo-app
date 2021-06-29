const NUM_OF_COL_TASK = 5;
const NUM_OF_COL_SUB_TASK = 4;

var numOfSubTasks = [];

var taskNum = 0;

function checkInputValEmpty(elementId) {
    return document.getElementById(elementId).value == "" ? true : false;
}

function insertStringToElementValue(elementId, str) {
    document.getElementById(elementId).value = str;
}

function addTask() {
    taskNum++;

    let inputTaskValue = document.getElementById("inputTask").value;

    // Check if task text input is empty
    if (checkInputValEmpty("inputTask")) {
        alert("You must write something");
        return;
    }
    insertStringToElementValue("inputTask", "");

    let body = document.getElementsByTagName("body")[0];

    if (taskNum == 1) {
        var tbl = document.createElement("table");

        tbl.setAttribute("id", "tasksTable");
        tbl.setAttribute("cellpadding", "10");

        body.appendChild(tbl);
    } else {
        var tbl = document.getElementById("tasksTable");
    }

    let tr = document.createElement("tr");

    for (let i = 0; i < NUM_OF_COL_TASK; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
    }

    // Create complete task checkbox
    let checkBoxCompleteTask = document.createElement("input");
    checkBoxCompleteTask.setAttribute("type", "checkbox");
    checkBoxCompleteTask.setAttribute("onchange", "completeTask(this.className)");

    // Create task input area
    let inputTaskTxt = document.createElement("input");
    inputTaskTxt.setAttribute("readonly", true);
    inputTaskTxt.setAttribute("type", "text");
    inputTaskTxt.setAttribute("value", inputTaskValue);

    // Create edit button
    let buttonEditTask = document.createElement("button");
    buttonEditTask.textContent = "Edit";
    buttonEditTask.setAttribute("onclick", "editTask(this.className)");

    // Create subtask input area
    let inputSubTaskTxt = document.createElement("input");
    inputSubTaskTxt.setAttribute("id", "inputSubTask" + taskNum);
    inputSubTaskTxt.setAttribute("type", "text");
    inputSubTaskTxt.setAttribute("placeholder", "Add subtask...");

    // Create subtask adding button
    let buttonAddSubTask = document.createElement("button");
    buttonAddSubTask.textContent = "Add Sub Task";
    buttonAddSubTask.setAttribute("onclick", "addSubTask(this.closest('td'), this.className)");

    // Create remove task button
    let buttonRemoveTask = document.createElement("button");
    buttonRemoveTask.textContent = "Remove";
    buttonRemoveTask.setAttribute("onclick", "removeTask(this.closest('tr'), this.className)");

    tr.cells[0].appendChild(checkBoxCompleteTask);
    tr.cells[1].appendChild(inputTaskTxt);
    tr.cells[2].appendChild(buttonEditTask);

    tr.cells[3].appendChild(inputSubTaskTxt);
    tr.cells[3].appendChild(buttonAddSubTask);

    tr.cells[4].appendChild(buttonRemoveTask);

    // Setting class to all elements in task's row
    for (let i = 0; i < NUM_OF_COL_TASK; i++) {
        for (let j = 0; j < tr.cells[i].children.length; j++) {
            tr.cells[i].children[j].setAttribute("class", "task" + taskNum);
        }
    }

    tbl.appendChild(tr);
}

function completeTask(className) {
    let row = document.getElementsByClassName(className);
    let chckbxTaskComplete = row[0];
    let inputTask = row[1];

    if (chckbxTaskComplete.checked) {
        inputTask.setAttribute("style", "text-decoration: line-through;");
    } else {
        inputTask.removeAttribute("style");
    }
}

function editTask(className) {
    let row = document.getElementsByClassName(className);
    let inputTask = row[1];
    let buttonEditTask = row[2];

    if (buttonEditTask.innerHTML == "Edit") {
        inputTask.removeAttribute("readonly");
        buttonEditTask.innerHTML = "Stop Editing";
    } else {
        inputTask.setAttribute("readonly", true);
        buttonEditTask.innerHTML = "Edit";
    }
}

function addSubTask(tdParent, className) {
    let inputSubTaskValue = document.getElementById("inputSubTask" + className.slice(-1)).value;

    // Check if subtask text input is empty
    if (checkInputValEmpty("inputSubTask" + className.slice(-1))) {
        alert("You must write something");
        return;
    }
    insertStringToElementValue("inputSubTask" + className.slice(-1), "");
    if (className.slice(-1) - 1 == numOfSubTasks.length) {
        numOfSubTasks.push(0);
    } else {
        for (let i = 0; i < className.slice(-1); i++) {
            try {
                if (!numOfSubTasks[i]) {
                    numOfSubTasks[i] = 0;
                }
            } catch (error) {
                numOfSubTasks.push(0);
            }
        }
        //[newFirstElement].concat(array)
    }
    numOfSubTasks[className.slice(-1) - 1]++;

    if (numOfSubTasks[className.slice(-1) - 1] == 1) {
        var tbl = document.createElement("table");

        tbl.setAttribute("id", "subTasksTable" + className.slice(-1));
        tbl.setAttribute("cellpadding", "5");

        tdParent.appendChild(tbl);
    } else {
        var tbl = document.getElementById("subTasksTable" + className.slice(-1));
    }

    let tr = document.createElement("tr");

    for (let i = 0; i < NUM_OF_COL_SUB_TASK; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
    }

    // Create complete subtask checkbox
    let checkBoxCompleteSubTask = document.createElement("input");
    checkBoxCompleteSubTask.setAttribute("type", "checkbox");
    checkBoxCompleteSubTask.setAttribute("onchange", "completeTask(this.className)");

    // Create subtask input area
    let inputSubTaskTxt = document.createElement("input");
    inputSubTaskTxt.setAttribute("readonly", true);
    inputSubTaskTxt.setAttribute("type", "text");
    inputSubTaskTxt.setAttribute("value", inputSubTaskValue);

    // Create edit button
    let buttonEditSubTask = document.createElement("button");
    buttonEditSubTask.textContent = "Edit";
    buttonEditSubTask.setAttribute("onclick", "editTask(this.className)");

    // Create remove task button
    let buttonRemoveSubTask = document.createElement("button");
    buttonRemoveSubTask.textContent = "Remove";
    buttonRemoveSubTask.setAttribute("onclick", "removeTask(this.className)");

    tr.cells[0].appendChild(checkBoxCompleteSubTask);
    tr.cells[1].appendChild(inputSubTaskTxt);
    tr.cells[2].appendChild(buttonEditSubTask);
    tr.cells[3].appendChild(buttonRemoveSubTask);

    // Setting class to all elements in task's row
    for (let i = 0; i < NUM_OF_COL_SUB_TASK; i++) {
        for (let j = 0; j < tr.cells[i].children.length; j++) {
            tr.cells[i].children[j].setAttribute("class", "subtask" + "_" + className.slice(-1) + "_" + numOfSubTasks[className.slice(-1) - 1]);
        }
    }

    tbl.appendChild(tr);
    //numOfSubTasks[className.slice(-1) - 1]++;
}

function removeTask(trParent, className) {
    let tbl = trParent.closest("table");

    for (let i = 0, row; row = tbl.rows[i]; i++) {
        if (i == className.slice(-1) - 1) {
            row.parentNode.removeChild(row);
            numOfSubTasks[className.slice(-1) - 1] = 0;
            break;
        }
    }
    for (let i = 0, row, counter = 1; row = tbl.rows[i]; i++) {
        for (let j = 0, col; col = row.cells[j]; j++) {
            for (let k = 0; k < col.children.length; k++) {
                col.children[k].className = "task" + counter;
                if (col.children[k].id != "undefined") {
                    if (col.children[k].nodeName.toUpperCase() == "input".toUpperCase()) {
                        col.children[k].id = "inputSubTask" + counter;
                    } else if (col.children[k].nodeName.toUpperCase() == "table".toUpperCase()) {
                        col.children[k].id = "subTasksTable" + counter;
                    }
                }
            }
        }
        counter++;
    }

    taskNum--;
    if (!taskNum) {
        taskNum = 0;
    }
}

function search() {
    let input = document.getElementById("inputSearch");
    let filter = input.value.toUpperCase();
    let td;
    let txtValue;
    try {
        var table = document.getElementById("tasksTable");
        var tr = table.getElementsByTagName("tr");
    } catch (error) {
        return;
    }
    // Loop through all table rows, and hide those who don't match the search
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
}