var Person = require('../models/Person.js');

/* GET ALL PERSONS */
function getPersons(req, res, next) {
    Person.find(function (err, persons) {
        if (err) return next(err);
        res.json(persons);
    });
}

/* GET SINGLE PERSON BY ID */
function getPerson(req, res, next) {
    Person.findById(req.params.id, function (err, person) {
        if (err) return next(err);
        res.json(person);
    });
}

/* SAVE PERSON */
function savePerson(req, res, next) {
    Person.create(req.body, function (err, person) {
        if (err) return next(err);
        res.json(person);
    });
}

/* UPDATE PERSON */
function updatePerson(req, res, next) {
    Person.findByIdAndUpdate(req.params.id, req.body, function (err, person) {
        if (err) return next(err);
        res.json(person);
    });
}

/* DELETE PERSON */
function deletePerson(req, res, next) {
    Person.findByIdAndRemove(req.params.id, req.body, function (err, person) {
        if (err) return next(err);
        res.json(person);
    });
}

module.exports = { getPersons, getPerson, savePerson, updatePerson, deletePerson };
