'use strict';
const admin = require('./admin/adminRouter');



module.exports = (app)=>{
	app.use('/admin',admin);
};
