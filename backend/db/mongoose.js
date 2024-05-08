const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.log('Error: ', err.message);
});