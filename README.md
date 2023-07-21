# Event Logs Service with Node.js, Google BigQuery, and Google Pub/Sub

This is a small data pipline web service for the anonymous post and get operations on event logs data with *Node.js*, *Google BigQuery*, and *Google Pub/Sub* following the **Clean Architecture principles**.

---

#### To start setting up the project

Step 1: Clone the repo

```bash
git clone https://github.com/mkeles17/event-logs-service-with-express-bigquery-pubsub.git
```

#### To run the project as a docker container

(Optional) Step 2: cd into the cloned repo and run:

```bash
docker-compose up
```

#### To run the project with node

(Optional) Step 2: cd into the cloned repo and run:

```bash
npm start
```

API is ready to use on port 3000!

**This API makes queries from/to a table from the dataset at BigQuery which is owned by me. It also uses Pub/Sub for transfering data to the table. In order to integrate this api to your own Google Cloud Project you should** 
 - **create your own dataset and table AND update environmental variable DATASET_TABLE_ID accordingly,** 
 - **create your own pub/sub schema, topic and bigQuery subscriptions AND update environmental variable TOPIC_ID accordingly.**
 - **generate your own key.json with the related service account that has authorization for Pub/Sub Client and BigQuery Client AND replace it with the existing one.**

*Port and api root can also be changed if desired, by changing the related environmental variables.*



## API Documentation

***BASE_URL=http://localhost:3000***

**POST** - /api/event-logs/ -> posts the event log data given in the RequestBody to the related BigQuery table. The restrictions are as follows:

* An event log **must** have 
    - a type *as string*,
    - a session_id *as string*,
    - an event_name *as string*,
    - an event_time *as number*,
    - a page *as string*,
    - a country *as string*,
    - a region *as string*,
    - a city *as string*,
    - a user_id *as string*.
* RequestBody must be in JSON format.
* You must use the naming convention as stated above.

Here is a sample valid RequestBody:

    {
    "type": "event",
    "session_id": "9FDA74C2-AB57-4840-87D0-64324772B5A2",
    "event_name": "click",
    "event_time": 1589623711,
    "page": "main",
    "country": "TR",
    "region": "Marmara",
    "city": "Istanbul",
    "user_id": "Uu1qJzlfrxYxOS5z1kfAbmSA5pF2"
    }

**GET** - /api/event-logs/ -> gets the aggregated results retrieved from BigQuery. It includes "total user count", "daily active user count", "daily new users" and "daily average session duration in seconds".

Here is a sample get response:

    {
    "total_users": 7,
    "daily_stats": [
        {
            "date": "21/07/2023",
            "average_session_durations": 30,
            "active_user_count": 3,
            "new_user_count": 3
        },
        {
            "date": "22/07/2023",
            "average_session_durations": 20,
            "active_user_count": 2,
            "new_user_count": 0
        },
        {
            "date": "23/07/2023",
            "average_session_durations": 40,
            "active_user_count": 6,
            "new_user_count": 4
        }
      ]
    }


## Author

- [**Mehmet Kutay Keleş**]

## License

This project is licensed under the MIT License.
