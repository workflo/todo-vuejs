module.exports = function () {
  let oConfig = {
    development: {
      api: {
        scheme: 'http',
        host: 'localhost:3000/cmsbs/rest/de.pinuts.todo.api',
        path: '',
        endpoints: {
          '/auth/token': {
            required_parameters: ['login', 'password']
          }
        }
      }
    },
    production: {
      api: {
        scheme: 'https',
        host: 'todo.nbonnici.info',
        path: '',
        endpoints: {
          '/auth/token': {
            required_parameters: ['login', 'password']
          }
        }
      }
    }
  }

  if (typeof oConfig[process.env.NODE_ENV] === 'undefined') {
    console.log('Current environment staging not supported: ', process.env.NODE_ENV)
    return null
  }

  return oConfig[process.env.NODE_ENV]
}
