const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require("path");


const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
dotenv.config()

app.use("/images", express.static(path.join(__dirname,"/images")));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
}).then(console.log("Connected to mogodb")).catch((err)=>console.log(err));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });


app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);

app.listen("4000",()=>{
    console.log("Serrver running...");
}) 

