const mongoose = require('mongoose');
const config = require("../config/server.config")
const collectionName = config.ADMIN_COLLECTION

const AdminSchema = mongoose.Schema
({
    First_Name:
    {
        type: String,
        require : true
    },
    Last_Name:
    {
        type: String,
        require : true
    },
    Account_Number:
    {
        type: Number,
        require : true
    },
    Aadhar_Number:
    {
        type: String,
        require : true
    },
    Pan_Number:
    {
        type: String,
        require : true
    },
    Password:
    {
        type: String,
        require : true
    },
    Total_Balance:
    {
        type: Number,
        require : true
    }
});

const Adminmodel = mongoose.model('admin', AdminSchema, collectionName);
module.exports = Adminmodel