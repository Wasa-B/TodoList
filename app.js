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
const item = document.querySelector('.first-item');
var listData = {
    list: [],
};
function loadData() {
    var data = localStorage.getItem(localKey);
    if (data == null) return;
    listData = JSON.parse(data);
}
loadData();
function saveData() {
    var data = JSON.stringify(listData);
    localStorage.setItem(localKey, data);
}

function addList(title, date, done) {
    listData.list.append([title, date, done]);
}

function drawList() {}

function generateTodo(text) {
    var todo = item.cloneNode(true);
    todo.className = '';
    var titleBox = todo.querySelector('.title');
    titleBox.innerText = text;

    var date = new Date();
    var dateBox = todo.querySelector('.date');
    dateBox.innerText = date.toDateString();

    const delBtn = todo.addEventListener('click', function () {});

    return todo;
}

summit.addEventListener('click', function () {
    var text = input.value;
    if (text == '') {
        text = 'Empty';
    }
    input.value = '';
    list.append(generateTodo(text));
    console.log(list.innerHTML);
    saveData();
});
