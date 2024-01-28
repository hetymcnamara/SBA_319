import express from "express"
import db from "../db/conn.mjs"
import {ObjectId} from 'mongodb'

const router = express.Router()


//GET - get all comments
router.get("/", async(req, res) => {
    const collection = await db.collection("comments")
    const results = await collection.find({}).limit(20).toArray()
    res.send(results).status(200)
})

//GET - show - get one comment
router.get('/:id', async(req, res) => {
    const collection = await db.collection('comments')
    const query = {_id: new ObjectId(req.params.id)}
    const result = await collection.findOne(query)

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200)
})


// POST - create new id for a comment // //newid-655c0e9f62d529dcd3d182c4//
router.post('/', async (req, res) => {
    const collection = await db.collection('comments')
    const newComment = req.body; 
    newComment.date = new Date()
    const result = await collection.insertOne(newComment)
    res.send(result).status(204)
})


//UPDATE - Update the new id created with new comment
router.patch("/:id", async(req, res) => {
    const query = {_id: new ObjectId(req.params.id)}
    const updates = {
        $push: {comments: req.body}
    };
    console.log(updates);
    const collection = db.collection("comments")
    const result = await collection.updateOne(query, updates)
    res.send(result).status(200)
})

//COMMENT DELETED SHOWN BELOW;
// {
//     "_id": {
//       "$oid": "5a9427648b0beebeb69579f5"
//     },
//     "name": "John Doe",
//     "email": "john_Doe@fakemail.com",
//     "movie_id": {
//       "$oid": "573a1390f29313caabcd446f"
//     },
//     "text": "Id error ab at molestias dolorum incidunt. Non deserunt praesentium dolorem nihil. Optio tempora vel ut quas.\nMinus dicta numquam quasi. Rem totam cumque at eum. Ullam hic ut ea magni.",
//     "date": {
//       "$date": "1975-02-21T00:31:22.000Z"
//     }
//   }

router.delete("/:id", async(req, res) => {
    const query = {_id: new ObjectId(req.params.id)}

    const collection = db.collection('comments')
    const result = await collection.deleteOne(query)

    res.send(result).status(200)
})



//INDEX CREATION 
const createCommentIndex = async () => {
    //create index for the movie_id field
    await db.comments.createIndex({movie_id:1});

    //create index for the email field
    await db.comments.createIndex({date: -1});
};

//createCommentIndex();











export default router;