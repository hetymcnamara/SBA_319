import express from "express"
import db from "../db/conn.mjs"
import {ObjectId} from 'mongodb'

const router = express.Router()

//GET - get all movies
router.get("/", async(req, res) => {
    const collection = await db.collection("movies")
    const results = await collection.find({}).limit(20).toArray()
    res.send(results).status(200)
})

//GET - show - get one movie
router.get('/:id', async(req, res) => {
    const collection = await db.collection('movies')
    const query = {_id: new ObjectId(req.params.id)}
    const result = await collection.findOne(query)

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200)
})


// POST - create new id for a movie //655c0a53549c4221d85ff7e5//
router.post('/', async (req, res) => {
    const collection = await db.collection('movies')
    const newMovie = req.body; 
    newMovie.date = new Date()
    const result = await collection.insertOne(newMovie)
    res.send(result).status(204)
})


//UPDATE - Update the new movie created
router.patch("/:id", async(req, res) => {
    const query = {_id: new ObjectId(req.params.id)}
    const updates = {
        $push: {movies: req.body}
    };
    console.log(updates);
    const collection = db.collection("movies")
    const result = await collection.updateOne(query, updates)
    res.send(result).status(200)
})












export default router;