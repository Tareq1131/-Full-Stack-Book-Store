const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({ message: "Book post successfully", book: newBook });
  } catch (cache) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Fail to create book", error });
  }
};
// get all books
const getAllBooks = async (req, res) => {
  try {
    // const books = await Book.find();
    const books = await Book.find().sort({ created: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failjed to fetch books" });
  }
};

// get single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Faield to fetch book" });
  }
};

// updateBook book
const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book update successfully",
      book: updateBook,
    });
  } catch (error) {
    console.error("Error update a book", error);
    res.status(500).send({ message: "Faield to update a book" });
  }
};

// delete a book
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting a book", error);
    res.status(500).send({ message: "Failed to delete a book" });
  }
};

module.exports = { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook};
