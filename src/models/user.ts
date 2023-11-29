import mongoose, { Document, Schema, model } from "mongoose";

// Define the interface for the Author document in MongoDB
interface Iauthor extends Document {
  AuthorName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

// Create the Mongoose schema for the Author document
const authorSchema = new Schema({
  "AuthorName": {
    type: String,
    required: true,
  },
  "email": {
    type: String,
    required: true,
    unique: true
  },
  "password": {
    type: String,
    required: true
  },
  "phoneNumber": {
    type: String,
    required: true,
  }
});

// Create the Author model using the Mongoose schema
export const Author = model<Iauthor>('Author', authorSchema);
