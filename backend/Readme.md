# Sinatra API to save to Redis

## Redis

The container will have an OAF and RDS save policy

## Sinatra

We use Puma to serve the app.

### Notes:

- the data passed within a GET request, i.e. in the query string is available with the equivalent methods:

```rb
request.env["rack.request.query_hash"]
params
```

- the data passed as payload (body) of a POST request is available with:

```rb
request.body.read
```
