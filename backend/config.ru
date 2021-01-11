require 'rubygems'
require 'bundler'
require "sinatra/reloader"

Bundler.require

# require './backend/app.rb' # overmind localhost
require './app.rb' # docker?
run SaveToRedis