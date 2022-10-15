const User = require('../models/userModel')
const Booking = require('../models/bookingModel')
const newApplication = async (req, res) => {

    const allCompanies = await Booking.find({}).sort({ createdAt: -1 }).limit(5)
    res.json(allCompanies)

}

const pendingApplication = async (req, res) => {
    const allCompanies = await Booking.find({ status: 'pending' })
    console.log(allCompanies, 'pending');
    res.json(allCompanies)
}

const registeredApplication = async (req, res) => {
    const allCompanies = await Booking.find({ status: 'Registered' })
    console.log(allCompanies, 'registeredcompanies');
    res.json(allCompanies)
}
const blockedApplication = async (req, res) => {
    const allCompanies = await Booking.find({ status: 'Blocked' })
    res.json(allCompanies)
}

const allApplication = async (req, res) => {

    const allCompanies = await Booking.find({}).sort({ createdAt: -1 })
    res.json(allCompanies)

}






const allApps = async (req, res) => {
    const emptyArr = []
    res.json(emptyArr)
}

const viewAppDetails = async (req, res) => {
    const company = await Booking.findById({ _id: req.params.id })
    console.log(company, 'comapmy');
    res.json(company)
}

const changingStatus = async (req, res) => {
    const { id, value } = req.body
    console.log(id, 'id', value, 'value');
    try {
        if (value == 1) {
            await Booking.findByIdAndUpdate({ _id: id }, { $set: { status: 'Registered' } })
            res.json({ status: true })
        } else if (value == 2) {
            await Booking.findByIdAndUpdate({ _id: id }, { $set: { status: 'Blocked' } })
            res.json({ status: true })
        }
    } catch (error) {
        console.log(error, 'error');
    }
}


module.exports = { viewAppDetails, allApps, allApplication, newApplication, pendingApplication, registeredApplication, blockedApplication,changingStatus }