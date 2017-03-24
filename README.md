# kadfe-client
Small node js library to talk to the kadfe server.

## Methods
+ `coffeeStatus` - Get the status of the coffee.
+ `clearCoffee` - Set coffee status to `unavailable`.
+ `makeCoffee` - Set coffee status to `available`.
+ `openSocket` - Open a websocket to be notified whenever the status changes.

*!!* All methods return promises *!!*

## Setup
The following environment variables are used in the construction
of the url used by the api.
+ `KADFE_HOST` hostname for the kadfe server
+ `KADFE_SSL` whether SSL is required for the server
+ `KADFE_PORT` (optional) the port the server is listening on
