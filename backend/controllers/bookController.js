const mlService = require("../services/mlService")

exports.getBooks = async (req, res, next) => {
  try {
    const books = await mlService.fetchBooks()
    res.json(books)
  } catch (error) {
    next(error)
  }
}

exports.getRecommendations = async (req, res, next) => {
  try {
    const { book } = req.body

    if (!book) {
      return res.status(400).json({
        message: "Book name is required"
      })
    }

    const recommendations =
      await mlService.fetchRecommendations(book)

    res.json(recommendations)
  } catch (error) {
    next(error)
  }
}
