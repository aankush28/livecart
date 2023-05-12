const mongoose  = require("mongoose");

const connectdata = () => {
    mongoose.connect(process.env.DB, {useNewUrlParser:true,useUnifiedTopology: true })

    .then((data) => {
    console.log(data.connection.host+"database");
    })
}
module.exports = connectdata;