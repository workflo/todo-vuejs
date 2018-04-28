let crypto = require('crypto')

module.exports = function (sEmail, iSize) {
  if (!iSize) {
    iSize = 128
  }
  if (!sEmail) {
    return `https://gravatar.com/avatar/?s=${iSize}&d=retro`
  }
  let md5 = crypto.createHash('md5').update(sEmail).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=${iSize}&d=retro`
}
