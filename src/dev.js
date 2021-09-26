const hello = async (event) => {
  return {
    message: process.env.TEST_MESSAGE
  }
}

module.exports = {
  hello
};