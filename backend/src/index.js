
import express from "express"

// cors 
import cors from "cors"
import path from "path";

import dotenv from "dotenv"
dotenv.config();


// though name is route in this file but as it is default so you can import it with any name
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"


import { connectDB } from "./lib/db.js";

import {app,server} from "./lib/socket.js";





// so can fetch cookies from season and authenticate logged in user
import cookieParser from "cookie-parser"
app.use(cookieParser());

const __dirname = path.resolve();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

// import bodyParser from "body-parser"
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.get("/",(req,res)=>{
    console.log("hello");
    res.send("hello");
})

app.use("/api/auth",authRoutes);

app.use("/api/messages",messageRoutes);

const PORT = process.env.PORT

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

server.listen(PORT,()=>{
    console.log("server is running is on "+PORT);
    connectDB();
})


// npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary soket.io
// npm install cors (to call backend api in frontEnd)
// npm run dev 




// to deploy first make front end in the backend server

// in the parent directory of frontend and backend 
// npm  init -y
// it will give u a package jason file

// now first in the package.json file of backend 
// in the script array  below the dev add start 
// ie 
// "dev": "nodemon src/index.js",
// "start": "node src/index.js"


// now in the root directory ie parent of frontend and 
// backend create .gitignore file
// in the frontend directory you will get a .gitignore file first copy every thing from the gitigonre file and then delete this gitignore file of frontend and then paste the data of gitignore file in the parent gitignore file.
// also add .env at the end of that 

// now in termial write git init 
// you will se .env and node_module package of backendk have been ignore 


// now in the parent package_json file 
// in the script 
// delete test and add 


// "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
//     "start": "npm run start --prefix backend"

// ie

// "scripts": {
//     "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
//     "start": "npm run start --prefix backend"
//   },

// now delete nodemodeule from front end and backend 
// then from the root directory terminal write
// npm run build
// this script will rebuild node_module package folder for both frontend and backend , 
// addition to that in the front end you wil get a foder dist that is optimize mini version of your entire  react application

// it is for backend to access front end which is now dist index.html

// then in the index.js form backend 
// import path from "path";
// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
//   }


// then in the axios js file change this 
// baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",