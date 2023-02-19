const express = require('express');
const router = express.Router();
const movies = require('../models/movieSchema')



//to add the data
router.post('/addItem', async (req, res) => {
    const { name, year, imgUrl, producer, actors } = req.body;


    if (!name || !year || !imgUrl || !producer || !actors) {
        res.status(404).json('Please fill the data');
    }
    else {
        try {
            const premovie = await movies.findOne({ name: name });

            if (premovie) res.status(404).json('This movie is already present!');
            else {
                const addMovie = new movies({ name, year, imgUrl, producer, actors });

                await addMovie.save();

                res.status(201).json(addMovie);
                console.log(addMovie)
            }
        } catch (error) {
            res.status(404).json('errors is: ' + error);
        }
    }

})


//to read the data
router.get("/home", async (req, res) => {
    try {
        const movieData = await movies.find();
        res.status(201).json(movieData);
        console.log('data sent');
    } catch (error) {
        res.status(404).json(error);
        console.log('data not sent');
    }
})


//to edit the data
router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const movieToEdit = await movies.findById({ _id: id });
        res.status(201).json(movieToEdit);
    } catch (error) {
        res.status(404).json("error in sending edit data " + error);
    }
})

router.patch("/edit/:id", async (req, res) => {
    const { name, year, imgUrl, producer, actors } = req.body;


    if (!name || !year || !imgUrl || !producer || !actors) {
        res.status(404).json('Please fill the data');
    }
    else {
        try {
            const {id}= req.params;
            
            const updatedMovie= await movies.findByIdAndUpdate(id, req.body, {
                new: true
            });

            res.status(201).json(updatedMovie);
        } catch (error) {
            res.status(404).json('errors is: ' + error);
        }
    }
})


router.delete('/delete/:id', async (req, res)=> {
    try {
        const {id}= req.params;

        const deleteMovie= await movies.findByIdAndDelete({_id: id});
        res.status(201).json(deleteMovie);
    } catch (error) {
        res.status(404).json('errors is: ' + error);
    }
})


module.exports = router;