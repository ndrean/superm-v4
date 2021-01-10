require 'logger'

class SaveToRedis < Sinatra::Base
   set :bind, '0.0.0.0'


   register Sinatra::Cors
   configure do
      enable :cross_origin
   end

   # in response to CORS from browser, the server sends  this in response headers
   before do
      response.headers['Access-Control-Allow-Origin'] = '*'
   end

   # this block sends 200 back for OPTIONS
   options "*" do
      response.headers["Allow"] = "GET, POST, DELETE, OPTIONS"
      response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
      response.headers["Access-Control-Allow-Origin"] = "*"
      status 200
   end

   set :allow_origin, "*"
   set :allow_methods, "GET,HEAD,POST, OPTIONS"
   set :allow_headers, "content-type,if-modified-since"

   configure do
      redis_url = ENV["REDISTOGO_URL"] || "redis://localhost:6379"
      uri = URI.parse(redis_url)
      $redis = Redis.new(host: uri.host, port: uri.port)
   end

  configure :development do
    register Sinatra::Reloader
  end
  set :logging, true
  #################################@
  
  get '/' do
   data = $redis.get("cart")
   puts data
   json({data: data})
  end

   post '/save' do  
      $redis.set('cart', request.body.read)
      200
      # json $redis.get('cart') <<- test curl ok
   end
end