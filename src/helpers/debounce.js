module.exports = function debounce (fFunction, iDelay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    let args = arguments
    let context = this
    timeoutID = setTimeout(function () {
      fFunction.apply(context, args)
    }, iDelay)
  }
}
