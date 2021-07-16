const express = require('express');
const app = express();

// --- NO LONGER IN USE ---

/*
  app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Hello from Server Side',
      app: 'Natours'
    })
});

  // app.get(string, a route handler -> a callback);
*/

app.get('/api/v1/tours', (req, res) => {

})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
})