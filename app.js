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

const summit = document.querySelector('.summit-btn');

const list = document.querySelector('.todo-box-list');

function generateTodo(text) {
    var todo = document.createElement('li');
    var div = document.createElement('div');
    div.className = 'todo-box';
    todo.append(div);

    var name = document.createElement('div');
    name.className = 'title center';
    name.innerText = text;
    div.append(name);

    var date = document.createElement('div');
    date.className = 'date center';
    div.append(date);

    var done = document.createElement('div');
    done.className = 'done-btn';
    div.append(done);

    var del_btn = document.createElement('div');
    del_btn.className = 'delete-btn';
    div.append(del_btn);

    return todo;
}

summit.addEventListener('click', function () {
    list.append(generateTodo('Test'));
    console.log(list.innerHTML);
});
