const express = require('express')
const router = express.Router();
const AdminController = require('../controller/admin.controller')
const validation = require('../middleware/validate.middleware')


router.post('/create', AdminController.create)
router.post('/login', AdminController.login)
router.post('/detail', AdminController.detail)
router.post('/fund', AdminController.fundstransfer)



module.exports = router