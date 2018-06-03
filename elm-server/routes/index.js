'use strict';
const admin = require('./admin/adminRouter');
const member = require('./member/memberRouter');



module.exports = (app)=>{
	app.use('/admin',admin);
	app.use('/member',member);
};
