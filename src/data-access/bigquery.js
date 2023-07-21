const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

module.exports = function makeBigQuery ({ bigQueryClient }) {
    return Object.freeze({
      getTotalUsers,
      getDailyStats
    })

    async function getTotalUsers() {

      const sqlQuery = 
        `SELECT 
        COUNT(DISTINCT user_id) AS total_user_count
        FROM ${process.env.DATASET_TABLE_ID};`;
      
      const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'EU',
        //params: {type: 'kutay2'},
       };

       // Run the query
       const [rows] = await bigQueryClient.query(options);

       //console.log('Rows:');
       //rows.forEach(row => console.log(row));
       return rows[0].total_user_count;

    }

    async function getDailyStats() {
      
      const sqlQuery = 
        `WITH daily_active_users AS (
          SELECT
            date,
            COUNT(DISTINCT user_id) AS active_user_count
          FROM ${process.env.DATASET_TABLE_ID}
          GROUP BY date
        ),
        
        daily_new_users AS (
          SELECT
            MinDate AS date,
            COUNT(user_id) AS new_user_count
          FROM (
            SELECT
              user_id,
              MIN(date) as MinDate
            FROM ${process.env.DATASET_TABLE_ID}
            GROUP BY user_id
          ) 
          GROUP BY date
        ),
        
        session_durations AS (
          SELECT
            session_id,
            date,
            MAX(event_time) - MIN(event_time) AS session_duration_seconds
          FROM ${process.env.DATASET_TABLE_ID}
          GROUP BY session_id, date
        ),
        
        daily_average_session_duration AS (
          SELECT
            date,
            AVG(session_duration_seconds) AS average_session_durations
          FROM session_durations
          GROUP BY date
        )
        
        SELECT
          FORMAT_DATE('%d/%m/%Y', d.date) AS date,
          COALESCE(a.average_session_durations, 0) AS average_session_durations,
          COALESCE(d.active_user_count, 0) AS active_user_count,
          COALESCE(n.new_user_count, 0) AS new_user_count,
        FROM
          ${process.env.DATASET_TABLE_ID} e
        LEFT JOIN daily_active_users d ON e.date = d.date
        LEFT JOIN daily_new_users n ON e.date = n.date
        LEFT JOIN daily_average_session_duration a ON e.date = a.date
        GROUP BY d.date, d.active_user_count, n.new_user_count, a.average_session_durations
        ORDER BY d.date;`;

      const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'EU',
        //params: {type: 'kutay2'},
       };

       // Run the query
       const [rows] = await bigQueryClient.query(options);

       return rows;
    }
}