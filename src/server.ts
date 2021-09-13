import express from 'express';
import { getSensorSummary, getBoxReadings } from './sql_requests'
import { createSqlConnection } from './db';

const app = express();
const port = 8080;
const connection = createSqlConnection("");

// Test DB connection
connection.connect((error, result) => {
    if (error)
      throw error;
  });

app.get(`/:box/:from/:to`, (req, res) => 
{
    // parse params
    const boxId = req.params.box;
    const from = new Date(req.params.from) || undefined;
    const to = new Date(req.params.to) || undefined;

    // get data and return 500 if there is an error, or send back a result json
    getBoxReadings(connection, boxId, from, to, function (error, results)
    {
        if (error)
            return res.status(500).json({"message": error.message})

        res.status(200).json({"result": results});
    });
});

app.get(`/aggregate`, (req, res) => 
{
    // get data and return 500 if there is an error, or send back a result json
    getSensorSummary(connection, function (error, results)
    {
        if (error)
            return res.status(500).json({"message": error.message})

        res.status(200).json({"result": results});
    });
});

// start server
app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
})