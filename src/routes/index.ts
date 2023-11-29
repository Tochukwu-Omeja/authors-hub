import express from 'express';
// import (ApolloServer) from '@apollo/server';
// import (startStandaloneServer) from '@apollo/server/standalone';
const router = express.Router();

// /* GET home page. */
router.get('/', function(req, res, next) {
  // render view from views/index.jade
  res.render('index', { title: 'Express - Book Library Project' });
});

// const server = new ApolloServer({
  
// });

export default router;
