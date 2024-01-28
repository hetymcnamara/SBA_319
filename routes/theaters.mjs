import express from "express"
import db from "../db/conn.mjs"
import {ObjectId} from 'mongodb'

const router = express.Router()

//GET - get all theaters
router.get("/", async(req, res) => {
    const collection = await db.collection("theaters")
    const results = await collection.find({}).limit(20).toArray()
    res.send(results).status(200)
})

//GET - show - get one theater
router.get('/:id', async(req, res) => {
    const collection = await db.collection('theaters')
    const query = {_id: new ObjectId(req.params.id)}
    const result = await collection.findOne(query)

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200)
})







export default router;