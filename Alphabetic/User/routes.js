import express from 'express'; 
import * as dao from './dao.js';

export default function UserRoutes(app){
  // SignUp route
  const signup = async (req, res) => {
    const user = await dao.findUserByEmail(req.body.email);  // Call createUser from DAO 
    if (user) {
      res.status(400).json(
        {message: "Email already in use"}
      );
      return;
    }
    const newUser = await dao.createUser(req.body);
    req.session['currentUser'] = newUser;  // Store user in session
    res.json(newUser);
  }

  // SignIn route
  const signin = async (req, res) => {
    const { email, password } = req.body;
    const currentUser = await dao.findUserByCredentials(email, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  }

  // Profile 
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // Update user profile 
  const updateUser = async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      return res.sendStatus(401);  // If no user is logged in
    }
    await dao.updateUser(currentUser._id, req.body);
    const updatedUser = await dao.findUserByEmail(currentUser.email);
    req.session['currentUser'] = updatedUser;  // Update the session with the new user data
    res.json(updatedUser); 
  }

  // SignOut
  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  //delete user
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.delete("/api/users/:userId", deleteUser);
}
