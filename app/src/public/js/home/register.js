'use strict'

/* 태그에 id로 불러와지는 선택자를 가져와라 - # */
const name = document.querySelector('#name');
const id = document.querySelector('#id');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const registerButton = document.querySelector('#button');

const executeSignUp = () => {
    if (!id.value) return alert('아이디를 입력해주세요.');
    if (!password.value) return alert('비밀번호를 입력해주세요.');
    if (password.value !== confirmPassword.value) return alert('비밀번호가 일치하지 않습니다.');

    const req = {
        name: name.value,
        id: id.value,
        password: password.value,
    }
    
    /* fetch를 통한 데이터 전달 */
    /* json은 promise형태로 반환되기에 then메서드를 한번 더 사용해야 함,
       then 메서드로 접근 가능 */
    fetch('/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = '/login';
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error('회원가입 중 에러 발생'));
    });
}

registerButton.addEventListener('click', executeSignUp);
