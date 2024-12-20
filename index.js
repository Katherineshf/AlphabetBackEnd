import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import PersonalizedRoutes from "./Alphabetic/Personalized/routes.js";
import RandomListRoutes from "./Alphabetic/RandomList/routes.js";
import SearchPageRoutes from "./Alphabetic/SearchPage/routes.js";
import UserRoutes from "./Alphabetic/User/routes.js";
import DetailsRoutes from "./Alphabetic/Details/routes.js";
import BucketListRoutes from './BucketList/routes.js';
mongoose.connect(process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Alphabetic");

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL ||"http://localhost:3000", 
  credentials: true,                  
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production" }
}));

app.use(express.json());

PersonalizedRoutes(app);
RandomListRoutes(app);
SearchPageRoutes(app);
UserRoutes(app);
DetailsRoutes(app);
BucketListRoutes(app);
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Accepting requests from: ${process.env.FRONTEND_URL}`);  // Add this to debug
});