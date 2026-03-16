const express = require("express")
const router = express.Router()

const {
  getBooks,
  getRecommendations
} = require("../controllers/bookController")

router.get("/", getBooks)

router.post("/recommend", getRecommendations)

module.exports = router
