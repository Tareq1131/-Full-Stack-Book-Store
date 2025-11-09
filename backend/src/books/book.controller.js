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
    const books = await Book.find().sort({created: -1});
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failjed to fetch books" });
  }
};

module.exports = { postABook, getAllBooks };
