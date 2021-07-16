const fs = require('fs');
const express = require('express');

const app = express();

// --- MIDDLEWARE ---

app.use(express.json());

// --- ENDPOINTS ---

// --- GET TOURS FILE ---

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);
const toursJSON = JSON.parse(tours);

// --- ROUTE HANDLERS ---

const getTours = (req, res) => {
  res
    .status(200)
    .json({
      status: 'Success',
      results: toursJSON.length,
      data: {
        tours: toursJSON,
      },
    })
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
    .status(202)
    .send(`Delete ID: ${id}`)
};

// --- ROUTERS ---

/*
  app.get('/api/v1/tours', getTours);
  app.post('/api/v1/tours', createTour);
  app.get('/api/v1/tours/:id', getTour);
  app.patch('/api/v1/tours/:id', updateTour);
  app.delete('/api/v1/tours/:id', deleteTour);
*/

// --- REFACTOR ROUTES ---

app
  .route('/api/v1/tours')
  .get(getTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

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
