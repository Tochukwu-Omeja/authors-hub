import { Document, Schema, model } from "mongoose";

// Define the interface for the Book document in MongoDB
export interface Ibook extends Document {
  title: string;
  datePublished: string;
  description: string;
  pageCount: number;
  genre: string;
  publisher: string;
}

// Create the Mongoose schema for the Book document
const bookSchema = new Schema({
  "title": {
    type: String,
    required: true,
    unique: true
  },
  "datePublished": {
    type: String,
    required: true,
  },
  "description": {
    type: String,
    required: true,
  },
  "pageCount": {
    type: Number,
    required: true,
  },
  "genre": {
    type: String,
    required: true,
  },
  "publisher": {
    type: String,
    required: true,
  }
});

// Create the Book model using the Mongoose schema
export const Book = model<Ibook>('Book', bookSchema);
