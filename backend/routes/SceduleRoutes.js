const { Router } = require('express');
const router = Router();
const SceduleController = require('../controllers/SceduleController');




router.get('/sendSubjects', SceduleController.sendSubjects_get);
// router.post('/', SceduleController);

// router.get('/', SceduleController);
// router.post('/', SceduleController);


module.exports = router;