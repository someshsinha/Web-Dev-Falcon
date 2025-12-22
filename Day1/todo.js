const fs=require('fs');
const filePath="./tasks.json";
//two functions loadTasks
//saveTasks => to override the file
function loadTasks(){
    try {
        const data = fs.readFileSync(filePath);
        const tasks = JSON.parse(data.toString());
        return tasks;
    }
    catch(err){
        return [];
    }
}
function saveTasks(tasks){
    const writestuff=JSON.stringify(tasks);
    fs.writeFileSync(filePath,writestuff);
}

const addTask=(task)=>{
    const tasks=loadTasks();
    tasks.push({ task , "completed":false});
    saveTasks(tasks);
    console.log("Item added successfully");
}

const listTasks=()=>{
    const tasks=loadTasks();
    tasks.forEach(((task,index)=>{
        console.log(`For ${index+1}: ${task.task} \t\t status: ${task.completed}`);
    }));
}

const removeTask=(task1)=>{
    const tasks=loadTasks();
    const newTask=[];
    tasks.forEach(task=>{
        if(task.task!=task1){
            newTask.push(task);
        }
    })
    saveTasks(newTask);
    console.log("Item removed successfully");
}

const markAsCompleted=(id1)=>{
    const id=parseInt(id1);
    const tasks=loadTasks();
    if(id>tasks.length){
        console.log(`Invalid task ID: ${id}`);
    }
    else {
        tasks.forEach((task, index) => {
            if (index + 1 === id) {
                task.completed = true;
            }
        })
        saveTasks(tasks);
        console.log("Marked as completed");
    }
}
const command=process.argv[2];
const argument=process.argv[3];
if(command === "add")addTask(argument);
else if(command === "list")listTasks();
else if(command === "remove")removeTask(argument);
else if(command === "markasdone")markAsCompleted(argument);
else console.log("Please enter a valid choice");