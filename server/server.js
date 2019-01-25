// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-relations
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

const { ApolloServer, gql } = require('apollo-server-express');
/*const  { typeDefs } = require('./schema.js');
const  { resolvers } = require('./schema.js');*/

const db = {
  users: [
    {
      organization: '123', // this is a relation by id
      id: 'abc',
      name: 'Elon Musk',
      password: 'password123',
    },
  ],
  organizations: [
    {
      users: ['abc'], // this is a relation by ids
      id: '123',
      name: 'Space X',
      phone: '555-555-5555',
    }
  ],
};

const typeDefs = gql`
	type Query {
    users: [User]
    user(id: ID!): User
    organizations: [Organization]
    organization(id: ID!): Organization
  }
  type User {
    organization: Organization
    id: ID
    name: String
    password: String
  }
  type Organization {
    users: [User]
    id: ID
    name: String
    phone: String
  }
`;


class User {
  constructor({ organization, ...rest }) {
    Object.assign(this, rest);
    this.organizationId = organization;
  }

  organization() {
    const organization = db
      .organizations
      .find(({ id }) => id === this.organizationId);

    return new Organization(organization);
  }
}

class Organization {
  constructor({ users, ...rest }) {
    Object.assign(this, rest);
    this.userIds = users;
  }

  users() {
    return db.users
      .filter(({ id }) => this.userIds.includes(id))
      .map(user => new User(user));
  }
}
// A map of functions which return data for the schema.
const resolvers = {
Query: {
  user: (parent, { id }) => {
    return new User(db.users.find(user => user.id === id));
  },
  organizations : () => {
    return db
      .organizations
      .map(organization => new Organization(organization));
  },
  organization: (parent, { id })  =>{
    const organization = db
      .organizations
      .find(organization => organization.id === id);

    return new Organization(organization);
  },
}
};


const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
});

var app = module.exports = loopback();
app.set('view engine', 'ejs'); // LoopBack comes with EJS out-of-box
app.set('json spaces', 2); // format json responses for easier viewing

// must be set to serve views properly when starting the app via `slc run` from
// the project root
app.set('views', path.resolve(__dirname, 'views'));

server.applyMiddleware({ app });

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      console.log('Browse your GraphQL Playground at %s/graphql', baseUrl);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
