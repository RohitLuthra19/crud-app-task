var express = require('express');
var router = express.Router();
var personController = require('../controllers/person');

/* GET ALL PERSONS */
router.get('/', personController.getPersons);

/* GET SINGLE PERSON BY ID */
router.get('/:id', personController.getPerson);

/* SAVE PERSON */
router.post('/', personController.savePerson);

/* UPDATE PERSON */
router.put('/:id', personController.updatePerson);

/* DELETE PERSON */
router.delete('/:id', personController.deletePerson);

module.exports = router;