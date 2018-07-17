'use strict';
const express = require('express');
const Order = require('../../controller/order/orderController');
const router = express.Router();

router.get('/orders',Order.getAllOrders);
router.get('/orders/count',Order.getAllOrdersCount);

router.get('/orders/users/:user_id', Order.getOrders);

router.get('/orders/users/:user_id/:order_id/snapshot', Order.getDetail);

module.exports = router;