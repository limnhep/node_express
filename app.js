const fs = require('fs');
const express = require('express');

const app = express();

// --- MIDDLEWARE ---

app.use(express.json());

// --- ENDPOINTS ---

// --- GET TOURS FILE ---

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);
const toursJSON = JSON.parse(tours);

// --- READ TOURS ---

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 'Success',
      results: toursJSON.length,
      data: {
        tours: toursJSON,
      },
    })
})

// --- READ A TOUR ---

app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);
  const id = Number(req.params.id);
  const tour = toursJSON.find(el => el.id === id);

  // if (id > toursJSON.length) {
  if (!tour) {
    return res
      .status(404)
      .json({
        status: 'Fail',
        message: 'Invalid ID'
      })
  }

  res
    .status(200)
    .json({
      status: 'Success',
      tour: tour
    })
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = toursJSON[toursJSON.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  toursJSON.push(newTour);

  fs.writeFile(`
    ${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursJSON),
    (err) => {
      res
        .status(201)
        .json({
          status: 'Success',
          data: {
            tour: newTour
          }
        })
    })
});

// --- UPDATE A TOUR ---

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id > toursJSON.length) {
    return res
      .status(404)
      .json({
        status: 'Fail',
        message: 'Invalid ID'
      })
  }

  res
    .status(200)
    .json({
      status: 'Success',
      data: {
        tour: '<Update the data...>'
      }
    })
});

// --- DELETE A TOUR ---

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id > toursJSON.length) {
    return res
      .status(404)
      .json({
        status: 'Fail',
        message: 'Invalid ID'
      })
  }

  res
    .status(204)
    .json({
      status: 'Sucess',
      data: null
    })
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

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
