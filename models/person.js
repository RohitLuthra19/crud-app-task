var mongoose = require('mongoose');
var PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        //match: [/^[A-Za-z]+$/, 'The value of path {PATH} ({VALUE}) is not a valid name.'],
        required: true
    },
    mobileNo: {
        type: String,
        //match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.'],
        required: true
    },
    emailId: {
        type: String,
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'The value of path {PATH} ({VALUE}) is not a valid email id.'],
        required: true
    },
});
module.exports = mongoose.model('Person', PersonSchema);