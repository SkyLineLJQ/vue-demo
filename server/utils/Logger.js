const colors = require('colors');
const log4js = require('log4js');

let Log4j = log4js.getLogger('vue-demo')
Log4j.level = "info"

const Logger = {
  // info(msg) {
  //   // console.log(`[Info] ${colors.green(msg)}`);
  //   console.log(`${colors.green('[INFO]  ')}` + msg);
  // },
  // warn(msg) {
  //   console.log(`[Warn] ${colors.yellow(msg)}`);
  // },
  // error(msg) {
  //   console.log(`${colors.bgRed('[Error] ---' + new Date().toLocaleString())} ${colors.red(msg)}`);
  // }
  info(msg){
    Log4j.info(msg)
  },
  warn(msg){
    Log4j.warn(msg)
  },
  error(msg){
    Log4j.error(msg)
  }
};

module.exports = Logger
