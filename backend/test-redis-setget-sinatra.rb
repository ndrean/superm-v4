require 'redis'
redis_url = ENV["REDISTOGO_URL"] || "redis://localhost:6379"
uri = URI.parse(redis_url)
$redis = Redis.new(host: uri.host, port: uri.port)


$redis.set('a',1)

puts $redis.get('a')