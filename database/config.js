const Mongoose = require("mongoose");


const dbConnection = async() => {

    try {

        await Mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true
        })

        console.log('DB Online')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la DB');
    }
}

module.exports = {
    dbConnection
}