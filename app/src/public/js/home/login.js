'use strict'

/* 태그에 id로 불러와지는 선택자를 가져와라 - # */
const id = document.querySelector('#id');
const password = document.querySelector('#password');
const loginButton = document.querySelector('#button');

const executeLogin = () => {
    const req = {
        id: id.value,
        password: password.value
    }
    
    /* fetch를 통한 데이터 전달 */
    /* json은 promise형태로 반환되기에 then메서드를 한번 더 사용해야 함,
       then 메서드로 접근 가능 */
    fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = '/';
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error('로그인 중 에러 발생'));
    });
}

/* 이벤트 등록 */
loginButton.addEventListener('click', executeLogin);

