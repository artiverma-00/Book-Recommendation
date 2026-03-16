const express = require("express")
const cors = require("cors")
const bookRoutes = require("./routes/bookRoutes")
const errorHandler = require("./middleware/errorHandler")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/books", bookRoutes)

app.use(errorHandler)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
