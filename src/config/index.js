module.exports = function () {
  console.log('load from store')
  let oConfig = {
    development: {
      api: {
        scheme: 'http',
        host: 'localhost:8080/cmsbs/rest/todo',
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
