#!/usr/bin/env node
import { getSensorSummary, getBoxReadings } from './sql_requests'
import { connection } from './db';
import { cmdOptions } from './cmd_options';

if (cmdOptions.aggregate)
{
  getSensorSummary(connection, function (error, results)
  {
    console.log(JSON.stringify(results, null, 4));
  });
}
else
{
  getBoxReadings(connection, cmdOptions.box, cmdOptions.from, cmdOptions.to, function (error, results)
  {
    console.log(JSON.stringify(results, null, 4));
  });
}

connection.end();
