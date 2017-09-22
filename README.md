# Moneta
Currency exchange comparison engine/app.

### Configuration
Copy .env.example to .env and replace any important values.

### Running
1. `npm install`
1. `gulp run-script serve`

### Testing
`npm test`

### Docker
`docker-compose up`

### Methods
#### Instruments
`GET /instruments`
`http://localhost:3000/instruments`

#### History
`GET /history/<pair>/<fromDate>/<toDate>`

`http://localhost:3000/history/BTC_ETH/2016-01-01/2018-01-01`

#### Ticker
`GET /ticker/<pair>`
`http://localhost:3000/ticker/BTC_ETH`


### Roadmap
* Greater than 90% test coverage
* Error middleware
* Logging system
* History data in UI
* Exchange interface/automation
