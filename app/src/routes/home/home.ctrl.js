'use strict'

const logger = require('../../config/logger');
const User = require('../../model/User');

/* render 메서드의 경우 절대 경로가 아닌 상대 경로로 입력 
   맨 앞에 슬래시가 존재할 경우 절대 경로로 인지 */
const output = {
    home: (req, res) => {
        logger.info('GET / 304 "홈 화면으로 이동"');
        res.render('home/index');
    },

    login: (req, res) => {
        logger.info('GET / 304 "로그인 화면으로 이동"');
        res.render('home/login');
    },

    register: (req, res) => {
        logger.info('GET / 304 "회원가입 화면으로 이동"');
        res.render('home/register');
    }
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,    
        };

        log(response, url);
        return res.status(url.status).json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: "POST",
            path: "/register",
            /* 회원가입은 201 에러를 반환해야 함 */
            status: response.err ? 400 : 201,    
        };

        log(response, url);
        return res.status(url.status).json(response);
    }
};

/* 함수를 외부에서 사용하도록 함 */
module.exports = {
    output,
    process,
};

const log = (response, url) => {
    if (response.err) {
        logger.error(`
            ${url.method} ${url.path} ${url.status} Response: ${response.success}, msg: ${response.err}
        `);
    }
    else {
        logger.info(`
            ${url.method} ${url.path} ${url.status} Response: ${response.success}, msg: ${response.msg || ""}
        `);
    }
}