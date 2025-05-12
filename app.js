// JSON.parse
// JSON.stringify
// const json = '{"result":true, "count":42}';
// console.log(JSON.parse(json));
// localStorage 가져오기: localStorage.getItem('key');
// localStorage 저장하기: localStorage.setItem('key', 'value');
// document.createElement('tag name'): 태그 생성

// 기능
// 1. input 창에 할일 입력 후 추가 버튼 클릭 또는 엔터
// 2. 할일 목록 로컬 스토리지에 저장
// 3. 로컬 스토리지 데이터 화면에 렌더링
// 4. 추가된 할일 데이터를 바탕으로 DOM 요소 추가
// 5. 삭제 버튼 클릭 시 삭제 기능 실행
// 6. 완료 버튼 클릭 시 데이터 DOM 이동 기능 실행

const localKey = 'todoList';
const submit = document.querySelector('.submit-btn');
const input = document.querySelector('.main input');
const list = document.querySelector('.todo-box-list');
const done_list = document.querySelector('.done-list');
const template = document.querySelector('template#todo-item');
const item = document.importNode(template.content, true);
// console.log(item);
// todolist 데이터 구조
var listData = {
    list: [],
};

//todoData생성
//----Get Date String
function getDate() {
    const today = new Date();

    const year = today.getFullYear(); // 2023
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 06
    const day = today.getDate().toString().padStart(2, '0'); // 18
    const hour = today.getHours().toString().padStart(2, '0');
    const min = today.getMinutes().toString().padStart(2, '0');

    const dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + min; // 2023-06-18

    return dateString;
}
function createData(text) {
    var data = {
        text: text,
        date: getDate(),
        done: false,
    };
    return data;
}
// 로컬데이터 저장
function saveData() {
    var data = JSON.stringify(listData);
    localStorage.setItem(localKey, data);
}
// 로컬데이터 로드
function loadData() {
    var data = localStorage.getItem(localKey);
    if (data == null) return;
    listData = JSON.parse(data);
}
// todo data 추가
function addData(data) {
    listData.list.push(data);
}
// todo data 제거
function removeData(index) {
    listData.list.splice(index, 1);
}
// todo data 변경
function updateData(index, text, date, done) {
    listData.list[index].text = text;
    listData.list[index].date = date;
    listData.list[index].done = done;
}
// todoList 그리기
// --template 생성
// ----HTML 하나 생성
function genElement(data, index) {
    const todo = item.cloneNode(true);
    todo.id = '';
    var titleBox = todo.querySelector('.text');

    titleBox.innerText = data.text;
    var dateBox = todo.querySelector('.date');
    dateBox.innerText = data.date;

    var isDone = todo.querySelector('.done-btn i');
    if (data.done == true) {
        isDone.className = 'ri-checkbox-line';
    }

    isDone.addEventListener('click', function () {
        updateData(index, data.text, data.date, data.done == false);
        saveData();
        drawList();
        // console.log(listData.list);
    });

    var delBtn = todo.querySelector('.delete-btn');
    delBtn.addEventListener('click', function (e) {
        let target = this.parentNode.parentNode.parentNode.parentNode;
        if (target.classList.contains('delete-anim')) {
            return;
        }
        target.classList.add('delete-anim');
        setTimeout(() => {
            removeData(index);
            drawList();
            saveData();
        }, 300);
    });
    return todo;
}
// --전체 리스트 그리기
function drawList() {
    // Clear List
    list.innerHTML = '';
    done_list.innerHTML = '';
    //draw elements
    // --- document에서 append를 자주하면 성능에 안좋으니 다른곳에서 하고 마지막에 document에 추가
    var listFrag = new DocumentFragment();
    var doneFrag = new DocumentFragment();
    listData.list.forEach((item, index) => {
        let todo = genElement(item, index);
        if (item.done == true) {
            doneFrag.append(todo);
        } else {
            listFrag.append(todo);
        }
    });
    list.append(listFrag);
    done_list.append(doneFrag);
}
loadData();
drawList();
//항목 추가 버튼 액션
function submitEvent() {
    var text = input.value;
    if (text == '') {
        return;
    }
    addData(createData(text));
    drawList();
    input.value = '';
    saveData();
}

submit.addEventListener('click', submitEvent);
input.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
        submitEvent();
    }
});

list.addEventListener('click', (e)=>{
    console.log(e.target);
    if(e.target.parentNode.classList.contains('delete-btn')){
        console.log("Test");
    }
});


