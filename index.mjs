import express from "express"
const app = express()
const port = 4000

import movies from "./routes/movies.mjs"
import comments from "./routes/comments.mjs"
import theaters from "./routes/theaters.mjs"

//MIDDLEWARE
app.use(express.json())
app.use('/movies', movies)

app.use('/comments', comments)

app.use('/theaters', theaters)


//ERROR HANDLING
app.use((err, req, res, next) => {
    res.status(500).send("Whoops, something went wrong!")
})







app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})