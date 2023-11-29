import express from "express";
// import {getAllBooks, addBook, getBook, deleteBook, updateBook} from "../controllers/book"
import {dashboard, deleteBook, updateBook} from "../controllers/book"
import { authenticate } from "../middleware/userAuth";
import { addBook } from "../controllers/book";


const router = express.Router();

router.get('/', authenticate, dashboard)

router.post('/addBooks', addBook)
router.get('/addBooks', addBook)
router.post('/:id/delete', deleteBook);
router.post('/:id/update', updateBook);
router.get('/:id/update', updateBook);

// ../books/
// router.route('/')
//   .get(getAllBooks)
//   .post(addBook);

// // ../books/<id>
// router.route('/:id')
//   .get(getBook)
//   .delete(deleteBook);

// // ../books/<id>/update
// router.route('/:id/update')
//   .put(updateBook)

export default router;
