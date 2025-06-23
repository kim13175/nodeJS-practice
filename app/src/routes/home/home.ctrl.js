'use strict'

const logger = require('../../config/logger');
const User = require('../../model/User');

/* render 메서드의 경우 절대 경로가 아닌 상대 경로로 입력 
   맨 앞에 슬래시가 존재할 경우 절대 경로로 인지 */
const output = {
    home: (req, res) => {
        logger.info('GET / 200 "홈 화면으로 이동"');
        res.render('home/index');
    },
    login: (req, res) => {
        logger.info('GET / 200 "로그인 화면으로 이동"');
        res.render('home/login');
    },
    register: (req, res) => {
        logger.info('GET / 200 "회원가입 화면으로 이동"');
        res.render('home/register');
    }
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if (response.err) logger.error(`POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`);
        else logger.info(`POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`);
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if (response.err) logger.error(`POST /login 200 Response: "success: ${response.success}`)
        else logger.info(`POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`);
        return res.json(response);
    }
};

/* 함수를 외부에서 사용하도록 함 */
module.exports = {
    output,
    process,
};