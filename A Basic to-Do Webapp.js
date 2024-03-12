var pendingInput = [];
var completeInput = [];
let isEdit = false;
let isEdit1 = false;
let editIndex = -1;


document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var title = document.getElementById('inputTitle').value;
    var describe = document.getElementById('inputDescribe').value;
    if (title.trim() !== '' && describe.trim() !== '') {
        var task = { title: title, describe: describe };
        if (isEdit) {
            pendingInput.splice(editIndex, 1, task);
            myFunction();
            isEdit = false;
            editIndex = -1;
        } else if(isEdit1){
            completeInput.splice(editIndex, 1, task);
            myCompletefunction();
            isEdit = false;
            editIndex = -1;
        }
        else {
            pendingInput.push(task);
            myFunction();
        }
        document.getElementById('myForm').reset();
    }
});

function myFunction() {
    let table1 = document.querySelector("#table  #tableBody");
    table1.innerHTML = "";
    let date = new Date();
    let td = date.toLocaleString();
    pendingInput.forEach((task, index) => {
        var row1 = document.createElement("tr");
        var row = table1.insertRow();
        var time = row.insertCell(0);
        var titleCell = row.insertCell(1);
        var describeCell = row.insertCell(2);
        var statusCell = row.insertCell(3);
        var edit = row.insertCell(4);
        time.textContent = td;
        titleCell.textContent = task.title;
        describeCell.textContent = task.describe;
        statusCell = row.getElementsByTagName('td')[3].innerHTML = `<button style="border: none;" ><i class="fa-solid fa-list-check"></i></button>`;
        edit = row.getElementsByTagName('td')[4].innerHTML = `<button style="border: none; id="editButton"><i class="fa-regular fa-pen-to-square"></i></button>` + " " + `<button style="border: none;"><i class="fa-solid fa-trash"></i></button>`;
        table1.appendChild(row1);

    });
    setLisners();
}

function setLisners() {


    const deleteItems = document.querySelectorAll('.fa-trash');
    deleteItems.forEach((deleteItem, i) => {

        deleteItem.addEventListener('click', (event) => {
            pendingInput.splice(i, 1);
            myFunction();
        }); 
    });

    const editItems = document.querySelectorAll('.fa-pen-to-square');
    editItems.forEach((editItem, i) => {
        editItem.addEventListener('click', e => {
            const values = pendingInput[i];
            console.log(values);
            let title = document.querySelector('#inputTitle');
            let describe = document.querySelector('#inputDescribe');
            title.value = values.title;
            describe.value = values.describe;
            isEdit = true;
            editIndex = i;
            myFunction();


        });
    });

    const statusItems = document.querySelectorAll('.fa-list-check');
    statusItems.forEach((statusItems, i) => {
        statusItems.addEventListener('click', (e) => {
            const values = pendingInput[i];
            console.log(values);
            completeInput.push(values);
            myCompletefunction();
            pendingInput.splice(i, 1);
            myFunction();
        });
    });

    const deleteItems1 = document.querySelectorAll('#cButton');
    deleteItems1.forEach((deleteItem, i) => {
        deleteItem.addEventListener('click', (e) => {
            completeInput.splice(i, 1);
            myCompletefunction();
        });
    });

    const editItems1 = document.querySelectorAll('#editButton');
    editItems1.forEach((editItem, i) => {
        editItem.addEventListener('click', e => {
            const values = completeInput[i];
            console.log(values);
            let title = document.querySelector('#inputTitle');
            let describe = document.querySelector('#inputDescribe');
            title.value = values.title;
            describe.value = values.describe;
            isEdit1 = true;
            editIndex = i;
        });
    });

}

function myCompletefunction() {
    let table1 = document.querySelector("#table2  #tableBody2");
    table1.innerHTML = "";
    let date = new Date();
    let td = date.toLocaleString();
    completeInput.forEach((task, index) => {
        var row1 = document.createElement("tr");
        var row = table1.insertRow();
        var time = row.insertCell(0);
        var titleCell = row.insertCell(1);
        var describeCell = row.insertCell(2);
        var statusCell = row.insertCell(3);
        var edit = row.insertCell(4);
        time.textContent = td;
        titleCell.textContent = task.title;
        describeCell.textContent = task.describe;
        statusCell.textContent = "Task Completed";
        edit = row.getElementsByTagName('td')[4].innerHTML = `<button style="border: none; " id="editButton"><i class="fa-regular fa-pen-to-square"></i></button>` + " " + `<button style="border: none;" id="cButton"><i class="fa-solid fa-trash"></i></button>`;
        table1.appendChild(row1);
    });
}