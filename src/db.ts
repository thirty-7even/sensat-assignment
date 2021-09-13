import {Connection, ConnectionConfig, createConnection} from 'mysql'
import fs from 'fs'
import yaml from 'js-yaml'

// SQL server connection
export function createSqlConnection(configPath?: string): Connection
{
    // Try to load and use yaml config file
    if (configPath)
    {
        try
        {
            const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as ConnectionConfig;
            return createConnection(config);
        }
        catch (e)
        {
            console.warn(e);
            console.warn("Could not parse yaml config, using default database config.");
        }
    }

    // This is for ease of testing, credential information would otherwise be stored in env vars
    return createConnection({
        host: 'interviews.ctsaq8pbcych.eu-west-2.rds.amazonaws.com',
        user: 'readonly',
        password: 'sensat_interview_r0',
        database: 'interviews'
    });
}