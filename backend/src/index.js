require('dotenv').config();
const mongoose = require("mongoose")
const config = process.env;


const app = require("./app")
const port = process.env.PORT || 5000

let server;


mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log("Connected to MongoDB");
    server = app.listen(port,()=>{
        console.log(`Listening to port ${port}`)
    })
})