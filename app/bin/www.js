'use strict'

const app = require('../app');
const PORT = 3000;

/* 이 코드가 있는 파일을 실행시켜야 함 */
app.listen(PORT, function() {
    console.log(`running on ${PORT}`);
});