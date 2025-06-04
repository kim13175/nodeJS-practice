// 명시하는 것이 좋음
'use strict'

const express = require('express');
const router = express.Router();

/* 경로로 이동하게 될 경우 실행되는 콜백 함수는 컨트롤러로 이동 */
const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

module.exports = router;