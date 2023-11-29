import { Request, Response } from "express";
import { Book } from "./../models/book";

// Controller function to display the dashboard with a list of books
export async function dashboard(req: Request, res: Response) {
  try {
    const books = await Book.find();
    const user = "User";
    const id = req.params.id;
    console.log(id);

    return res.render("dashboard", { books, id });
  } catch (error) {
    // Handle errors here if needed
  }
}

// Controller function to add a new book
export async function addBook(req: Request, res: Response) {
  // If the request method is GET, render the addbook view
  if (req.method === "GET") return res.render("addbook");

  try {
    // Extract book information from the request body
    const { title, datePublished, description, pageCount, publisher, genre } =
      req.body;
    const newBook = new Book({
      title,
      datePublished,
      description,
      pageCount,
      publisher,
      genre,
    });

    // Save the new book and redirect to the books list
    await newBook.save();
    // console.log(newBook);
    return res.redirect("/books");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to delete a book by its ID
export async function deleteBook(req: Request, res: Response) {
  console.log("calling controller function to delete a book by id");
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const id = req.params.id;
  console.log(id);

  try {
    // Find and delete the book by its ID
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

// Controller function to update book information by its ID
export async function updateBook(req: Request, res: Response) {
  console.log("calling controller function to update a book by id");
  // If the request method is GET, render the updatebook view
  
  const id = req.params.id;
  const updates = req.body;
  try {
    // Find the book by its ID and update its information
    const book = await Book.findById(id);
    if (book) {
      console.log(book);
      if (req.method === "GET") return res.render("updatebook", {book});
      Object.assign(book, { ...book, ...updates });
      await book.save();
      res.redirect(`/books`);
    } else {
      throw new Error("Book not found!");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
