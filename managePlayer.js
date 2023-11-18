const Player = require('../models/player');

//to post the records to database
exports.postAddPlayer = async (req, res, next) => {
    try {
        const name = req.body.name;
        const dateOfBirth = req.body.dateOfBirth;
        const photoUrl = req.body.photoUrl;
        const birthPlace = req.body.birthPlace;
        const numberOfMatches = req.body.numberOfMatches;

        const career = req.body.career;
        const score = req.body.score;
        const fifties = req.body.fifties;
        const centuries = req.body.centuries;
        const wickets = req.body.wickets;
        const average = req.body.average;
        console.log('name = ' + name);
        console.log('dateOfBirth = ' + dateOfBirth);
        console.log('photoUrl = ' + photoUrl);
        console.log('birthPlace = ' + birthPlace);
        console.log('career = ' + career);

        console.log('numberOfMatches = ' + numberOfMatches);
        console.log('score = ' + score);
        console.log('fifties = ' + fifties);
        console.log('centuries = ' + centuries);
        console.log('wickets = ' + wickets);
        console.log('average = ' + average);

        const newPlayer = await Player.create({
            name: name,
            dateOfBirth: dateOfBirth,
            photoUrl: photoUrl,
            birthPlace: birthPlace,
            career: career,
            numberOfMatches: numberOfMatches,
            score: score,
            career: career,
            fifties: fifties,
            centuries: centuries,
            wickets: wickets,
            average: average,
        });
        //will send json response back to the client
        res.status(201).json({ newPlayerDetails: newPlayer });
    }
    catch (err) {
        console.log('Post palyer is failing' + JSON.stringify(err));
        res.status(500).json({
            error: err,
        })
    }
}

exports.getOnePlayer = async (req, res, next) => {
    try {
        const paricularPlayerName = req.params.name;
        console.log('paricularPlayerName = ' + paricularPlayerName);

        const particularPlayerData = await Player.findAll({ where: { name: paricularPlayerName } });
        console.log('particularPlayerData = ' + JSON.stringify(particularPlayerData));

        if (particularPlayerData.length == 0) {
            return res.status(404).json({ message: 'Player not found' })
        } else
            res.status(200).json({ particularData: particularPlayerData });
    }
    catch (err) {
        console.log('Get book is failing' + JSON.stringify(err));
        res.status(500).json({ error: err });
    }
}

exports.getAllPlayers = async (req, res, next) => {
    try {
        const bookData = await Player.findAll();
        console.log('bookData = ' + JSON.stringify(bookData));
        res.status(200).json({ BookData: bookData });
    }
    catch (err) {
        console.log('Get book is failing' + JSON.stringify(err));
        res.status(500).json({ error: err });
    }
}

exports.updatePlayer = async (req, res, next) => {
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