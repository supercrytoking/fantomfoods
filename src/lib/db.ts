import mongoose from 'mongoose'

const database = async () =>
    await mongoose.connect('mongodb+srv://alsinas:YUfxSWboR0JuIRgQ@cluster0.wixxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

export default database
