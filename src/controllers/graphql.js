var { buildSchema } = require('graphql');
var { graphqlHTTP } = require('express-graphql');
const { MockData } = require('../models/init-models')
var schema = buildSchema(`
  input PageInput {
    first: Int
    after: String
  }
  input CreateUser {
    id: Int!
    first_name: String!
    last_name: String
    email: String
    gender: String
    ip_address: String
  }
  type Query {
    hello: String!
    salom: String
    product(id:Int): Products
    items(q:String, input:PageInput) : [Products]
    user(id:Int!): Foyda
    all: [Demo]
  }
  type Mutation {
    createUser(input:CreateUser!): Demo!
  }
  type Products {
    id: Int!
    name: String!
  }
  type Foyda {
    id: Int!
    firstname: String
    lastname: String
    phone_number: String
    role: String
  }
  type Demo {
    id: Int
    first_name: String
    last_name: String
    email: String
    gender: String
    ip_address: String
  }
`);
var root = {
  hello: () => {
    return "dsadas";
  },
  salom: () => {
    return 'salom !';
  },
  product: ({ id }) => {
    return {
      id: id,
      name: null
    }
  },
  items: ({ q, input }) => {
    console.log(input, q)
    return [
      {
        id: 1,
        name: 'Product1',
      },
      {
        id: 2,
        name: 'Product2',
      }
    ]
  },
  createUser: async ({ input }) => {
    const model = await MockData.create({
      id: input.id,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      gender: input.gender,
      ip_address: input.ip_address
    })
    return model
  },
  user: async ({ id }) => {
    const model = await User.findOne({
      where: { id }
    })
    return model
  },
  all: async () => {
    const model = await MockData.findAll()
    return model
  }
};

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})