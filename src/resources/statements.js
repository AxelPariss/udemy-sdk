class Statements {
  constructor(axios) {
    this.axios = axios
  }

  async get() {
    try {
      const page = 1
      let statements = []
      statementsRemaining = true
      while (statementsRemaining) {
        const response = await this.axios.get(`share-holders/207380/statements/?page=${page}`)
        statements = [...statements, response.data]
        if (response.data.results.length * page >= response.data.count) {
          statementsRemaining = false
        }
      }

      return statements
    } catch (e) { }
  }
}

module.exports = (axios) => {
  return new Statements(axios)
}