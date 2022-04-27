import { mongoose } from "mongoose";

const { Schema } = mongoose;

const goldenSchema = new Schema({
  language: String,
  title: String,
  code: String,
  fav: Boolean,
  description: String,

});

const Login = new Schema({
  username: String,
  password: String,
});


export const models = [
  {
    name: "Note",
    schema: goldenSchema,
    collection: "theGoldenNotes",
  },
  {
    name: "User",
    schema: Login,
    collection: "Login",
  }
];




