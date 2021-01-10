# Sinatra API to save to Redis

Sinatra gem served by Puma to persist the 'cart' from the React app into Redis.

## Redis

The container will have an OAF and RDS save policy

## Sinatra

We use Puma to serve the app.

### Notes on Sinatra

- CORS enabled

- the data passed within a GET request, i.e. in the query string is available with the equivalent methods:

```rb
data = request.env["rack.request.query_hash"]
or
data = params
```

- the data passed as payload (body) of a POST request is available with:

```rb
payload = request.body.read
```
