# kadfe-client
Small node js library to talk to the kadfe server.

## Methods
+ `status` - Get the status of the coffee.
+ `claim` - Claim the coffee.

*!!* All methods return promises *!!*

## Setup
The following environment variables are used in the construction
of the url used by the api.
+ `KADFE_HOST` hostname for the kadfe server
+ `KADFE_SSL` whether SSL is required for the server
+ `KADFE_PORT` (optional) the port the server is listening on
