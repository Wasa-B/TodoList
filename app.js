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
const summit = document.querySelector('.summit-btn');
const input = document.querySelector('.main input');
const list = document.querySelector('.todo-box-list');
const item = document.querySelector('.template');
// todolist 데이터 구조
var listData = {
    list: [],
};
//todoData생성
function createData(text) {
    var _date = new Date();
    var data = {
        text: text,
        date: _date.toDateString(),
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
function updateData(index, data) {
    listData.list[index] = data;
}
// todoList 그리기
// --template 새성
function genElement(data, index) {
    var todo = item.cloneNode(true);
    todo.className = '';
    var titleBox = todo.querySelector('.title');
    titleBox.innerText = data.text;
    var dateBox = todo.querySelector('.date');
    dateBox.innerText = data.date;

    var isDone = todo.querySelector('.done-btn i');
    if (data.done == true) {
        isDone.className = 'ri-checkbox-line';
    }

    isDone.addEventListener('click', function () {
        updateData(index, createData(data.text, data.date, !data.done));
        saveData();
        drawList();
        console.log(data);
    });

    var delBtn = todo.querySelector('.delete-btn');
    delBtn.addEventListener('click', function () {
        removeData(index);
        drawList();
        saveData();
    });
    list.append(todo);
}
// --전체 리스트 그리기
function drawList() {
    while (list.firstChild) {
        list.firstChild.remove();
    }
    listData.list.forEach((item, index) => {
        genElement(item, index);
    });
}
loadData();
drawList();
//항목 추가 버튼 액션
summit.addEventListener('click', function () {
    var text = input.value;
    if (text == '') {
        text = 'Empty';
    }

    addData(createData(text));
    drawList();
    input.value = '';
    console.log(list.innerHTML);
    saveData();
});
