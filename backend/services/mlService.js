const axios = require("axios")
const { ML_API } = require("../config/config")

exports.fetchBooks = async () => {
  const res = await axios.get(`${ML_API}/books`)
  return res.data
}

exports.fetchRecommendations = async (book) => {
  const res = await axios.post(`${ML_API}/recommend`, {
    book
  })

  return res.data
}
