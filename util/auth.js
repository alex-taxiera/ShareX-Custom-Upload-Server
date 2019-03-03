function auth(keys) {
  keys = keys.filter((key) => key)
  return (pass) => {
    if (keys && keys.length > 0) {
      if (pass && keys.some((key) => pass === key)) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
}
module.exports = auth
