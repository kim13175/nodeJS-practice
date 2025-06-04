'use strict'

const User = require('../../model/User');

/* render 메서드의 경우 절대 경로가 아닌 상대 경로로 입력 
   맨 앞에 슬래시가 존재할 경우 절대 경로로 인지 */
const output = {
    home: (req, res) => {
        res.render('home/index');
    },
    login: (req, res) => {
        res.render('home/login');
    },
    register: (req, res) => {
        res.render('home/register');
    }
}

const process = {
    login: (req, res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = user.register();
        return res.json(response);
    }
};

/* 함수를 외부에서 사용하도록 함 */
module.exports = {
    output,
    process,
};