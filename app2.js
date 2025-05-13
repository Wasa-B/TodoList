class TodoData {
    constructor(text) {
        this.text = text;
        this.date = TodoData.getDate();
        this.done = false;
    }
    static parse(json){
        return Object.setPrototypeOf(JSON.parse(json), this.prototype);
    }
    static cast(obj){
        return Object.setPrototypeOf(obj, this.prototype);
    }
    static getDate(){
        const today = new Date();
        const year = today.getFullYear(); // 2023
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 06
        const day = today.getDate().toString().padStart(2, '0'); // 18
        const hour = today.getHours().toString().padStart(2, '0');
        const min = today.getMinutes().toString().padStart(2, '0');

        const dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + min; // 2023-06-18

        return dateString;
    }
    getJson(){
        return JSON.stringify(this);
    }
}
class TodoPage{
    constructor(dataKey, template){
        this.itemID = 0;
        this.dataKey = dataKey;
        this.tasks = [];
        this.template = template;
        this.removeAction = null;
        this.updateAction = null;
        this.drawAction = null;
    }
    loadTask(){
        const json = localStorage.getItem(this.dataKey);
        const dataList = JSON.parse(json);
        if(!dataList) return;
        dataList.forEach((element) => {           
            const task = TodoData.cast(element);
            this.tasks.push(task);
            this.drawElement(task);
        });
    }
    saveTask(){
        const saveTask = this.tasks.filter((val)=>val != null);
        const json = JSON.stringify(saveTask);
        localStorage.setItem(this.dataKey, json);
    }
    addTask(text){
        let task = new TodoData(text);
        this.tasks.push(task);
        this.drawElement(task);
        this.saveTask();
    }
    removeTask(index){
        let task = this.tasks[index];
        this.tasks[index] = null;
        const target = document.querySelector(`#item-${index}`);
        if(this.removeAction) this.removeAction(index,task,target);
        this.saveTask();
    }
    updateTask(index){
        const task = this.tasks[index];
        task.done = !task.done;
        const target = document.querySelector(`#item-${index}`);
        if(this.updateAction)this.updateAction(index,task,target);
        this.saveTask()
    }
    drawElement(task){
        const element = this.template.cloneNode(true);
        let index = this.itemID;
        this.itemID += 1;
        element.id = `item-${index}`;
        if(this.drawAction) this.drawAction(index,task, element)
        
        return element;
    }
}

const template = document.querySelector("#todo-item");
const templateItem = document.importNode(template.content, true).querySelector('li');

const taskList = document.querySelector(".todo-box-list");
const doneList = document.querySelector(".done-list");

const submit = document.querySelector('.submit-btn');
const input = document.querySelector('.main input');

const pageData = new TodoPage("TestKey",templateItem);

pageData.removeAction = function(index,task,target){
    target.classList.add("delete-anim");
    setTimeout(() => {
          target.classList.add("delete");
    }, 300);
}
pageData.updateAction = function(index,task,target){
    const target_i =target.querySelector(`.done-btn i`);
    console.log("object");
    target.className = "move-out-anim";
    setTimeout(() => {
        if(task.done){
            target_i.className = 'ri-checkbox-line';
            doneList.append(target);
        }else{
            target_i.className="ri-checkbox-blank-line"
            taskList.append(target);
        }
        target.className = "move-in-anim";
        setTimeout(()=>{
            target.className = "";
        }, 300);
    }, 400);
}
pageData.drawAction = function(index,task, element){
    element.querySelector(".text").innerText = task.text;
    element.querySelector('.date').innerText = task.date;
    var isDone = element.querySelector('.done-btn i');
    if (task.done == true) {
        isDone.className = 'ri-checkbox-line';
    }
    isDone.addEventListener('click', ()=>{
        pageData.updateTask(index);
    });
    var delBtn = element.querySelector('.delete-btn');
    delBtn.addEventListener('click',()=>{
        pageData.removeTask(index);
    });
    if(task.done == false){
        taskList.append(element);
    }else{
        doneList.append(element);
    }
}

function submitEvent() {
    var text = input.value;
    if (text == '') {
        return;
    }
    pageData.addTask(text);
    input.value = '';
}

submit.addEventListener('click', submitEvent);
input.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
        submitEvent();
    }
});

pageData.loadTask();
