# Interview Solution - KrakenFlex

This is my solution to the KrakenFlex interview problem as requested.

- Install dependencies using `yarn install`
- Run tests with `yarn test`
- Run program with `API_KEY=<key> yarn start`

## Note

- At the time of writing, I wasn't able to get this code to run correctly with
your `POST /site-outages/` endpoint - I'm pretty certain the payload is correct, but I'm getting a 400
response with the messages 'unexpected outages received'. That being said, I get
the same response when I run the example request to the `/site-outages` endpoint
that's included with your swagger file, so I wonder if your endpoint is working.
