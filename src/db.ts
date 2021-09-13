import {createConnection} from 'mysql'

// SQL server connection
export const connection = createConnection({
    host: 'interviews.ctsaq8pbcych.eu-west-2.rds.amazonaws.com',
    user: 'readonly',
    password: 'sensat_interview_r0',
    database: 'interviews'
});