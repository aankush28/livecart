const express = require("express")
const app = express();
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const connectdata = require("./config/database");
const cloudinary = require("cloudinary")
const path = require('path');

dotenv.config({ path: "./config/config.env" });
 
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
//Route Imports
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1",payment)
// Middleware for errors
app.use(errorMiddleware)

app.use('/', express.static(path.join(__dirname, "build")));
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('./build/index.html'));
});




process.on('uncaughtException', function(err) {
  console.log(" UNCAUGHT EXCEPTION ");
  console.log(err.message);
});
connectdata()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
const server = app.listen(process.env.PORT, () => {
    console.log(`server is runing in ${process.env.PORT}`)
})


// unhandled promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error:${err.massage}`)
    console.log(`shutting down the server due to unhandle promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})
module.exports = app