'use strict'

const app = require('../app');
const logger = require('../src/config/logger');

const PORT = process.env.PORT;

/* 이 코드가 있는 파일을 실행시켜야 함 */
app.listen(PORT, function() {
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});