let toDoListContainerEl = document.getElementById("toDoListContainer");
let userInputEl = document.getElementById("userInput");

// let localStorageItem = "My local storage element";
// localStorage.setItem("myItem",localStorageItem);

// let getLocallyStoreItem = localStorage.getItem("myItem");
// console.log(getLocallyStoreItem);

// localStorage.removeItem("myItem")




function  getParsedTodo(){
    let mytodo = localStorage.getItem("mytodo");
    let parsedTodoList = JSON.parse(mytodo);

    if(parsedTodoList===null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}

let toDoList = getParsedTodo();



// Below array is for to add todo
// let toDoList = [
//     {
//         title: "HTML-5",
//         uniqueId: 1,
//     },
//     {
//         title: "CSS-3",
//         uniqueId: 2,
//     },
//     {
//         title: "JavaScript",
//         uniqueId: 3,
//     }
// ];

function onSaveTodo(){
    let locallystoredList = JSON.stringify(toDoList);
    localStorage.setItem("mytodo",locallystoredList)
}



// Below toDoStatusChange function is for add linethrough
function toDoStatusChange(titleEl,uniqueIdEl,toDoId){
    let mycheckboxEl = document.getElementById(uniqueIdEl);
    let myLebelEl = document.getElementById(titleEl)
    
    if(mycheckboxEl.checked===true){
        myLebelEl.classList.add("checked");
    }
    else{
        myLebelEl.classList.remove("checked");
    }


    let statusTodoIndex = toDoList.findIndex(function(each){
        let eachTodoId = "todo"+each.uniqueId;
        if(eachTodoId===toDoId){
            return true;
        }
        else{
            return false
        }
    })

    

    let checkseTodo = toDoList[statusTodoIndex];

    if(checkseTodo.isChecked===true){
        checkseTodo.isChecked = false;
    }
    else{
        checkseTodo.isChecked = true;
    }
}


//  Below onDeletToDoEl function is for delet todo
function onDeletToDoEl(toDoId){
    let delitedTodo = document.getElementById(toDoId);
    toDoListContainerEl.removeChild(delitedTodo);

    let deletTodoIndex = toDoList.findIndex(function(each){
        let eachTodoId = "todo"+each.uniqueId;
        if(eachTodoId===toDoId){
            return true;
        }
        else{
            return false
        }
    })
    toDoList.splice(deletTodoIndex,1);
    console.log(toDoList);
}


// Below createAndAppendToDo function is for main UI
function createAndAppendToDo(todo){
    let toDoId = "todo" +  todo.uniqueId;
    let uniqueIdEl = "checkboxCheck" + todo.uniqueId;
    let titleEl = "titleEl" + todo.uniqueId;


    let toDoCardEl = document.createElement("div");
    toDoCardEl.classList.add("todo-card");
    toDoCardEl.id = toDoId;
    toDoCardEl.style.marginTop = "20px"
    toDoListContainerEl.append(toDoCardEl);

    let checkBoxEl = document.createElement("input");
    checkBoxEl.classList.add("check-input")
    checkBoxEl.type = "checkbox";
    checkBoxEl.checked=todo.isChecked;
    checkBoxEl.id = uniqueIdEl;
    toDoCardEl.append(checkBoxEl);
    checkBoxEl.onclick = function(){
        toDoStatusChange(titleEl,uniqueIdEl,toDoId);
    }

    let checklebel = document.createElement("label");
    checklebel.classList.add("label")
    checklebel.htmlFor = uniqueIdEl;
    toDoCardEl.appendChild(checklebel);

    let titleToDoEl = document.createElement("p");
    titleToDoEl.textContent = todo.title;
    titleToDoEl.classList.add("check-input");
    titleToDoEl.id = titleEl;
    if(todo.isChecked===true){
        titleToDoEl.classList.add("checked")
    }
    checklebel.appendChild(titleToDoEl);
    


    let deletIconEl = document.createElement("i");
    deletIconEl.classList.add("fa-solid","fa-trash");
    deletIconEl.onclick = function(){
        onDeletToDoEl(toDoId);
    }
    checklebel.appendChild(deletIconEl)
}





// Below onTodoAdd function is for add new tido from input elemenut
function onTodoAdd(){
    let lengthOfTodo = toDoList.length;

    let userInputval = userInputEl.value;
    if(userInputval===""){
        alert("enter valid input");
    }
    else{
        let newTodo = {
            title: userInputval,
            uniqueId: lengthOfTodo+1,
            isChecked:false
            
        }
        toDoList.push(newTodo);
    
        createAndAppendToDo(newTodo);
    }
    
    userInputEl.value = "";

}


// for loop is use to continur add todo and display
for(let todo of toDoList){
    createAndAppendToDo(todo);
}