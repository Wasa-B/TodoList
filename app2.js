class TodoData {
    constructor(text) {
        this.text = text;
        this.date = getDate();
    }
    static parse(json){
        return Object.setPrototypeOf(JSON.parse(json), this.prototype);
    }
    getJson(){
        return JSON.stringify(this);
    }
}

const allTask=[];
const pageData={
    task:[], done:[]
}

function AllSave(){
    
}

function PageLoad(){

}