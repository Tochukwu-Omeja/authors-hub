import { Request, Response, NextFunction } from "express";
import { Author } from "../models/user";
import { registerValidator, loginValidator } from "../utils";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// Respond with a resource from users
export function myController(req: Request, res: Response, next: NextFunction) {
  res.json({ msg: "respond with a resource from users" });
}

// Handle user signup
export async function signup(req: Request, res: Response, next: NextFunction) {
  // If request method is GET, render the signup page
  if (req.method === "GET") return res.render("signup");

  // Validate user input using registerValidator
  const result = registerValidator.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  try {
    const { password } = req.body;
    // Hash the password (Please use bcrypt or another proper hashing mechanism)
    const hashedPassword = password; // Replace with proper hashing
    // Create a new user with hashed password
    const newUser = await Author.create({
      ...req.body,
      password: hashedPassword,
    });
    res.redirect("/users/login");
  } catch (error: any) {
    res.json({ error: error.message });
  }
}

// Handle user login
export async function login(req: Request, res: Response, next: NextFunction) {
  // If request method is GET, render the login page
  if (req.method === "GET") return res.render("login");

  // Validate user input using loginValidator
  const result = loginValidator.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await Author.findOne({ email });

    if (!user) return res.send("Invalid login details");

    // Compare provided password with user's hashed password
    if (password !== user.password) return res.send("Invalid login details");

    // Generate a JWT token for authentication
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: 30 * 60,
    });

    // Set token as a cookie for secure storage
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 30 * 60,
    });

    // Redirect user to the '/books' page
    return res.redirect("/books");
  } catch (error: any) {
    res.json({ error: error.message });
  }
}

// Handle user logout
export async function logout(req: Request, res: Response, next: NextFunction) {
  // Clear the authentication token cookie
  res.clearCookie("token");
  // Redirect user to the login page
  res.redirect("/users/login");
}
