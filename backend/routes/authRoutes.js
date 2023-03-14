const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');




router.get('/signin', authController.signin_get );
router.post('/signin', authController.signin_post);

router.get('/registor', authController.registor_get);
router.post('/registor', authController.registor_post);


module.exports = router;