const mongoose = require('mongoose')

//Connect Database
async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log('Connected Mongodb!'))
            .catch(() => console.log('Connection fialed !'))
    } catch (error) {

    }
}

module.exports = connectToDB