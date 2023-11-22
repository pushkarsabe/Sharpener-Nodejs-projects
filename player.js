const express = require('express');

const router = express.Router();

const playerManagerController = require('../controllers/managePlayer');

router.post('/add-player', playerManagerController.postAddPlayer);

router.get('/get-player/:name', playerManagerController.getOnePlayer);

router.put('/update-player', playerManagerController.updatePlayer);

// router.get('/get-player', playerManagerController.getAllPlayers);



module.exports = router;