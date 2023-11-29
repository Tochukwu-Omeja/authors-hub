import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import booksRouter from "./routes/books";
import mongoose from "mongoose";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
//import server from "./graphQL/server";
import resolvers from "./graphQL/resolvers";
import typeDefs from "./graphQL/typeDefs";


const app = express();

const server = new ApolloServer({
  typeDefs,
   resolvers,
 });

startStandaloneServer(server, {listen: {port: 4000} })
.then(() => {
  console.log("Apollo Server is running on port 4000");
})
.catch((error) => { console.log(error); })



// Connect to the MongoDB database
const databaseUrl = process.env.DATABASE_URL as string;
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Configure express app
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

// Configure routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render("error");
  }
);

export default app;
