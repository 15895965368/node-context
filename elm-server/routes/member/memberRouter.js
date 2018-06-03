'use strict';

const express = require('express');
const router = express.Router();
const VipCart = require('../../controller/member/vipcart');

router.post('users/:user_id/delivery_card/physical_card/bind',VipCart.useCart);

module.exports = router;