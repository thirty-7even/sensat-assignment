import {Connection, MysqlError} from 'mysql'

function getData(connection: Connection, query: string, responseCallback? : (err: MysqlError | null, results?: any) => void): void
{
    connection.query(query, function (error: any, results: any, fields: any) 
    {
        var json = JSON.parse(JSON.stringify(results));

        if (responseCallback)
            responseCallback(error, json);
    });
}

export function getSensorSummary(connection: Connection, responseCallback? : (err: MysqlError | null, results?: any) => void): void
{
    var queryString = `
    SELECT 
        readings.box_id, 
        readings.sensor_id, 
        sensors.name, 
        sensors.unit, 
        MIN(reading) AS min, 
        MAX(reading) AS max, 
        AVG(reading) AS avg 
    FROM readings INNER JOIN sensors ON readings.sensor_id = sensors.id 
    GROUP BY box_id, sensor_id`;

    getData(connection, queryString, responseCallback);
}

export function getBoxReadings(connection: Connection, box?: String, from?: Date, to?: Date, responseCallback? : (err: MysqlError | null, results?: any) => void): void
{
    var queryString = `
    SELECT 
        readings.box_id, 
        readings.sensor_id, 
        sensors.name, 
        sensors.unit, 
        readings.reading, 
        readings.reading_ts 
    FROM readings INNER JOIN sensors ON readings.sensor_id = sensors.id`;

    // Build condition depending on input parameters
    var conditionString = "";

    if (box)
        conditionString += (conditionString.length > 0 ? ' AND': '') + ` box_id = '${box}'`;
    if (from && !isNaN(from.valueOf()))
        conditionString += (conditionString.length > 0 ? ' AND': '') + ` reading_ts >= '${from.toISOString()}'`;
    if (to && !isNaN(to.valueOf()))
        conditionString += (conditionString.length > 0 ? ' AND': '') + ` reading_ts <= '${to.toISOString()}'`;
    
    if (conditionString.length > 0)
        queryString += ' WHERE' + conditionString;

    getData(connection, queryString, responseCallback);
}