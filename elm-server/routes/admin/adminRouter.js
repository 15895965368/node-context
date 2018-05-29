'use strict';

const express = require('express');
const Admin = require('../../controller/admin/adminController');

const router = express.Router();


router.get('/login',Admin);

module.exports = router;