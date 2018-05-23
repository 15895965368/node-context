'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	id: Number,
	admin: {type: String, default: '管理员'},
	user_name: String,
	password: String,
	status: Number,  //1:普通管理、 2:超级管理员
	avatar: {type: String, default: 'default.jpg'},
	city: String,
	create_time: String,
});

adminSchema.index({id:1});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;