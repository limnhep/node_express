const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Hello from Server Side',
      app: 'Natours'
    })
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
})