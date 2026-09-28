const url = "http://localhost:3000/tasks"
let currentID=null;

async function getTasks() {
    let res = await fetch(url)
    let tasks=await res.json()
return tasks;
}

$(document).ready(async function (){



    let tasks = await getTasks()
    for(let task of tasks){
$("#task").append(`

<div class="task">

<h5 class="min-w-50">${task.taskdesc}</h5>

 <div> 
 <button class="btn color-success" onClick=editTask("${task.id}")>EDIT</button>
 <button class="btn color-warning" onClick="completeTask('${task.id}',this)">COMPLETED</button>
 <button class="btn color-danger"  onClick=deleteTask("${task.id}")>DELETE</button>
 </div>

 
</div>

`);



    }
    
}


)


// add task 
async function addTask(){

    const taskVal = $("#input-task").val();

    let newTask={
        taskdesc:taskVal
    }

    await fetch(url,{
        method:"POST",
        headers:{
            "content-type" : "application/json"

        },
        body:JSON.stringify(newTask)
    })

$("#input-task").val()="";
}


// Delete Task 

async function deleteTask(id){

    await fetch(`${url}/${id}`,{
        method:"DELETE"
    })

    
}


// Complete Task

async function completeTask(id,currentbtn){

   let res = (await fetch(`${url}/${id}`));
let task= await res.json();
let element = $(`h5:contains(${task.taskdesc})`);

if ($(currentbtn).text() == "COMPLETED") {
    console.log(task.taskdesc)

     element.css("text-decoration", "line-through");
$(currentbtn).text("UNCOMPLETED")
}

else{
        element.css("text-decoration", "none");
    $(currentbtn).text("COMPLETED")

}







}


//    console.log(element)

async function editTask(id){

   let res = (await fetch(`${url}/${id}`));
let task= await res.json();
   console.log(task.taskdesc)
   $("#input-task").val(task.taskdesc)

   currentID=id;

}


async function saveChanges(){
let updatedTask=   $("#input-task").val()

let newTask={
    taskdesc:updatedTask
}
await fetch(`${url}/${currentID}`,{
    method:"PUT",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(newTask)
})


currentID=null;
}


$("#addBtn").click(function(){

    if(currentID==null){
        addTask()
    }
    else{
        saveChanges()
    }

})
// getTasks()