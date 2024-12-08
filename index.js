import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
//import bodyParser from 'body-parser';
import PersonalizedRoutes from "./Alphabetic/Personalized/routes.js";
import RandomListRoutes from "./Alphabetic/RandomList/routes.js";
import SearchPageRoutes from "./Alphabetic/SearchPage/routes.js";
import UserRoutes from "./Alphabetic/User/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Alphabetic"
mongoose.connect(CONNECTION_STRING);

const app = express();
// Get the frontend URL from the .env file
const FRONTEND_URL = 'http://localhost:3001'
const corsOptions = {
  origin: FRONTEND_URL,  // Use the URL from .env
  credentials: true,      // Allow sending cookies and authentication info
};
app.use(cors(corsOptions)); 

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
//app.use(bodyParser.json());// Middleware to parse incoming request bodies
PersonalizedRoutes(app);
RandomListRoutes(app);
SearchPageRoutes(app);
UserRoutes(app);
// Set up the server to listen on a specific port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});