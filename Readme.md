# React frontend with Sinatra/Redis backend

We will save here the cart to Redis configured to save to disk. We have a small Ruby/Sinatra api that serves the React requests (via the app-server Puma), and Sinatra communicates with Redis.

## 1) Running **dev mode** on localhost with **overmind**

We have the following directory structure:

```bash
-/Profile
 |-/frontend (React, node_modules)
 |-/backend (Gemfile, Puma app-sever, Sinatra api)
```

We can run separatly `yarn start` (React) and `bundle exec Puma` (the app-server that serves the Sinatra/Ruby api).

We will run both processes at once with **overmind**. To run these two processes from another folder than the standard one, we will create a **/bin** folder in the backend folder, and use the **-cwd** flag for `yarn`.

### Binstubs

To run `bundler` from another direcory, create a **/bin** folder:

```bash
$> bundle install --binstubs
```

This creates a directory (defaults to ~/bin) and place any executables from the gem there. These executables run in Bundler's context. If used, you might add this directory to your environment's PATH variable. For instance, if the rails gem comes with a rails executable, this flag will create a bin/rails executable that ensures that all referred dependencies will be resolved using the bundled gems.

### Overmind flags

- to use, do `overmind start`
- you can also specify the name of the Profile with the flag `-f Procfile`.
- To start a single process, use `-l` flag
- To specify the port for a specific process, do `-p $PORT` in the process
- To run `yarn` from another directory, use `--cwd` flag

```bash
$> overmind start -l backend
```

The Profile used here is:

```bash
#Profile
backend: ./backend/bin/bundle exec ./backend/bin/puma -p 9292 -C ./backend/puma.rb
frontend: yarn --cwd ./frontend/ -p 3000 start
```

## 2) Running on Docker

We will run Nginx as reverse proxy to serve React's static built files and forward requests to the app-server Puma which serves the Sinatra backend, that communicates with Redis.

We will create 4 processes: **Redis**, **Nginx**, **Sinatra**, **React**
