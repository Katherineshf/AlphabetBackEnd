import model from "./model.js";

export const createUser = (user) => {
  delete user._id
  return model.create(user);
}

export const findUserByEmail = (email) => model.findOne({email: email}); //for sign up
export const findUserByCredentials = (email, password) => model.findOne({email, password});
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });




