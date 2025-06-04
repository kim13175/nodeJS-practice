'use strict';

/* 일반적인 서버 열기 */
const express = require('express');
/* json 데이터 파싱위한 모듈 */
const bodyParser = require('body-parser');
const app = express();

/* routing 연결 */
const home = require('./src/routes/home');

/* 앱 세팅 */
app.set('view engine', 'ejs');
app.set('views', './src/views');
/* 정적 파일 경로로 추가 (js 파일 등) */
app.use(express.static(`${__dirname}/src/public`));
/* body parser middle ware 적용 */
app.use(bodyParser.json());
/* url 통해 전달되는 데이터에 한글, 공백 등의 문자 인코딩 관련 문제 해결 */
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', home); // middle ware 등록

module.exports = app;