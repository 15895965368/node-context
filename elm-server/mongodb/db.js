'use strict';
const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config-lite');
mongoose.connect('mongodb://localhost:27017/elm', {useMongoClient:true});

const db = mongoose.connection;//获取connection实例

db.once('open',()=>{
	console.log(chalk.green('连接数据库成功'));
});

db.on('error',()=>{
	console.log(chalk.red('连接失败'));
	mongoose.disconnect();
});

db.on('close',()=>{
	console.log(
      chalk.red('数据库断开')
    );
     mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

module.exports = db;