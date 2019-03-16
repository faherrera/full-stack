const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost:27017/fullstackdb', {
    useNewUrlParser:true,
})
.then(
    db => console.log('Db is connected')
)
.catch(
    err => console.log('Err in db',err)
);