define({ "api": [
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register",
    "group": "Auth",
    "description": "<p>Registers a new user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password2",
            "description": "<p>The user's password for confirmation.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    user: {\n        _id: \"12345\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Some validation error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/AuthController.es6",
    "groupTitle": "Auth",
    "name": "PostAuthRegister"
  },
  {
    "type": "post",
    "url": "/auth/token",
    "title": "Login",
    "group": "Auth",
    "description": "<p>Performs password-based login and returns an access token on success.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>The user's email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    token: \"abcdefghijkl\",\n    user: {\n        _id: \"12345\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>The login did not succeed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/AuthController.es6",
    "groupTitle": "Auth",
    "name": "PostAuthToken"
  },
  {
    "type": "delete",
    "url": "/todos",
    "title": "Delete",
    "group": "TODOs",
    "description": "<p>Deletes an existing TODO.</p>",
    "parameter": {
      "fields": {
        "JSON Body": [
          {
            "group": "JSON Body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The TODO's ID</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>A valid session token (<code>Bearer xxxxxxx</code>)</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Missing or invalid Authorization token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>TODO not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/TodoController.es6",
    "groupTitle": "TODOs",
    "name": "DeleteTodos"
  },
  {
    "type": "get",
    "url": "/todos",
    "title": "List",
    "group": "TODOs",
    "description": "<p>Returns details of all TODOs.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>A valid session token (<code>Bearer xxxxxxx</code>)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    data: [\n        {\n            content: \"<p>Do the laundry</p>\",\n            _id: \"12345\",\n            done: false\n        },\n        { ... }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Missing or invalid Authorization token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>TODO not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/TodoController.es6",
    "groupTitle": "TODOs",
    "name": "GetTodos"
  },
  {
    "type": "get",
    "url": "/todos/:id",
    "title": "Show",
    "group": "TODOs",
    "description": "<p>Returns details of an existing TODO.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The TODO's ID.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>A valid session token (<code>Bearer xxxxxxx</code>)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    data: {\n        content: \"<p>Do the laundry</p>\",\n        _id: \"12345\",\n        done: false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Missing or invalid Authorization token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>TODO not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/TodoController.es6",
    "groupTitle": "TODOs",
    "name": "GetTodosId"
  },
  {
    "type": "post",
    "url": "/todos",
    "title": "Create",
    "group": "TODOs",
    "description": "<p>Creates a new TODO.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>The TODO's (HTML) body</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>A valid session token (<code>Bearer xxxxxxx</code>)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    data: {\n        content: \"<p>Do the laundry</p>\",\n        _id: \"12345\",\n        done: false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Missing or invalid Authorization token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/TodoController.es6",
    "groupTitle": "TODOs",
    "name": "PostTodos"
  },
  {
    "type": "put",
    "url": "/todos",
    "title": "Update",
    "group": "TODOs",
    "description": "<p>Updates an existing TODO.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The TODO's ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>The TODOs (HTML) body</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "done",
            "description": "<p>The <em>done</em> state</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>A valid session token (<code>Bearer xxxxxxx</code>)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    data: {\n        content: \"<p>Do the laundry</p>\",\n        _id: \"12345\",\n        done: false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Missing or invalid Authorization token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>TODO not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/TodoController.es6",
    "groupTitle": "TODOs",
    "name": "PutTodos"
  },
  {
    "type": "get",
    "url": "/users/list",
    "title": "List",
    "group": "Users",
    "description": "<p>Returns an optionally filtered list of registered users.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_id",
            "description": "<p>If given, return only the user matching this ID.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>A valid session token (<code>Bearer xxxxxxx</code>)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    data: [\n        {\n            id: \"12345\",\n            email: \"hans.maulwurf@pinuts.de\",\n            profile: {\n                firstname: \"Hans\",\n                lastname: \"Maulwurf\",\n                gender: \"male\",\n                lang: \"english\",\n                url: \"https://pinuts.de\",\n                bio: \"\"\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Missing or invalid Authorization token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/UserController.es6",
    "groupTitle": "Users",
    "name": "GetUsersList"
  },
  {
    "type": "put",
    "url": "/users",
    "title": "Update",
    "group": "Users",
    "description": "<p>Updates the current User's profile.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profile-firstname",
            "description": "<p>The user's firstname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profile-lastname",
            "description": "<p>The user's lastname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profile-url",
            "description": "<p>The user's homepage URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profile-bio",
            "description": "<p>The user's bio</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>A valid session token (<code>Bearer xxxxxxx</code>)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Missing or invalid Authorization token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "cmsbs-conf/cse/plugins/de.pinuts.todo/rest/UserController.es6",
    "groupTitle": "Users",
    "name": "PutUsers"
  }
] });
