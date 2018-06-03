'use strict';

const express = require('express');
const Admin = require('../../controller/admin/adminController');

const router = express.Router();


router.post('/login',Admin.login);
router.get('/singout',Admin.singout);
router.get('/all',Admin.getAllAdmin);
router.get('/count',Admin.getAdminCount);
router.get('/info',Admin.getAdminInfo);
router.post('/updateAvatar/:adminId',Admin.updateAvatar);


module.exports = router;