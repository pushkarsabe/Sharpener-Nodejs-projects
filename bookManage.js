const Book = require('../models/book');

//to post the records to database
exports.postAddBook = async (req, res, next) => {
    try {
        const bookName = req.body.bookName;
        const bookTakenOn = req.body.bookTakenOn;
        const bookReturnDate = req.body.bookReturnDate;
        const currentFine = req.body.currentFine;
        const bookReturned = req.body.bookReturned;
        console.log('bookName = ' + bookName);
        console.log('bookTakenOn = ' + bookTakenOn);
        console.log('bookReturnDate = ' + bookReturnDate);
        console.log('currentFine = ' + currentFine);
        console.log('bookReturned = ' + bookReturned);

        //for checking if input values are empty or not 
        if (!bookName) {
            throw new Error('Please add book name')
        }

        const newBook = await Book.create({
            bookName: bookName,
            bookTakenOn: bookTakenOn,
            bookReturnDate: bookReturnDate,
            currentFine: currentFine,
            bookReturned: bookReturned,
        });
        //will send json response back to the client
        res.status(201).json({ newBookDetails: newBook });
    }
    catch (err) {
        console.log('Post book is failing' + JSON.stringify(err));
        res.status(500).json({
            error: err,
        })
    }
}

exports.getAllBooks = async (req, res, next) => {
    try {
        //to filter out books which are not returned by the user
        const returned = 'no';
        const bookData = await Book.findAll({ where: { bookReturned: returned } });
        console.log('bookData = ' + JSON.stringify(bookData));
        res.status(200).json({ BookData: bookData });
    }
    catch (err) {
        console.log('Get book is failing' + JSON.stringify(err));
        res.status(500).json({ error: err });
    }
}


exports.deleteExpense = async (req, res, next) => {
    try {
        if (req.params.id === undefined || req.params.id === "") {
            res.status(400).json({ err: 'ID is missing' });
        }
        const expenseId = req.params.id;
        console.log('expenseId = ' + expenseId);
        await Expense.destroy({ where: { id: expenseId } });
        res.sendStatus(200);
    }
    catch (err) {
        console.log('Delete expense` is failing' + JSON.stringify(err));
        res.status(500).json({ error: err });
    }
}

exports.getOneBook = async (req, res, next) => {
    try {
        const paricularBookId = req.params.id;
        console.log('paricularBookId = ' + paricularBookId);
        const particularBookData = await Book.findAll({ where: { id: paricularBookId } });
        console.log('particularBookData = ' + JSON.stringify(particularBookData));
        res.status(200).json({ particularData: particularBookData });
    }
    catch (err) {
        console.log('Get book is failing' + JSON.stringify(err));
        res.status(500).json({ error: err });
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const updatedData = req.body;
        const bookUpdateId = updatedData.id;
        console.log('updatedData = ' + JSON.stringify(updatedData));
        console.log('bookUpdateId = ' + bookUpdateId);

        //return statement is important otherwise other code will gte executed and will throw error
        if (bookUpdateId === '' || bookUpdateId === undefined || bookUpdateId === 0) {
            return res.status(500).json({ error: 'ID not found' });
        }
        //to check if the id is valid or not 
        const existingBook = await Book.findByPk(bookUpdateId);
        console.log('existingBook = ' + existingBook);

        //to check if the if existingBook is real or not
        //return statement is important otherwise other code will gte executed and will throw error
        if (!existingBook || existingBook === null) {
            return res.status(500).json({ error: 'book not found' });
        }
        //updateExpense is built in function to update the data using sequelize
        //which takes updated object and the where clause
        const result = await Book.update(updatedData, { where: { id: bookUpdateId } });
        //after updating send the response
        res.status(200).json({ message: 'Book updated successfully', result });
    }
    catch (err) {
        console.log('Error updating book ' + err);
        res.status(500).json({ error: err });
    }
}