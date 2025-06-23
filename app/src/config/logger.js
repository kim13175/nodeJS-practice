/* 출력하고 싶은 포맷 사용 */
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf, label, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`
});

const printLogFormat = {
    file: combine(
        label({ label: 'nodejs 테스트' }),
        timestamp({ format: "YYYY-MM-DD HH:mm:dd" }),
        printFormat,
    ),
    console: combine(
        colorize(),
        simple(),
    )
};

const opts = {
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info" ,
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level: "info",
        format: printLogFormat.console,
    }),
}

const logger = createLogger({
    transports: [opts.file],
});

/* 환경 변수를 사용해서 실제 서비스용 서버인지 개발용 서버인지 구분 가능 */
if (process.env.NODE_ENV !== "production") {
    logger.add(opts.console);
}

logger.stream = {
    write: (message) => logger.info(message),
}

module.exports = logger;