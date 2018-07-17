'use strict';
const admin = require('./admin/adminRouter');
const member = require('./member/memberRouter');
const order = require('./order/orderRouter');


module.exports = (app)=>{
	app.use('/admin',admin);
	app.use('/member',member);
	app.use('/order',order);
};
