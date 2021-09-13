#!/usr/bin/env node
import { getSensorSummary, getBoxReadings } from './sql_requests'
import { cmdOptions } from './cmd_options';
import { createSqlConnection } from './db';

const connection = createSqlConnection(cmdOptions.configPath);

// Check DB connection
connection.connect((error, result) => {
  if (error)
    throw error;
});


if (cmdOptions.aggregate)
{
  getSensorSummary(connection, function (error, results)
  {
    if (error)
      console.error(error);

    console.log(JSON.stringify(results, null, 4));
  });
}
else
{
  getBoxReadings(connection, cmdOptions.box, cmdOptions.from, cmdOptions.to, function (error, results)
  {
    if (error)
      console.error(error);

    console.log(JSON.stringify(results, null, 4));
  });
}

connection.end();
