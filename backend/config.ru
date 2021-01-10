require 'rubygems'
require 'bundler'
require "sinatra/reloader"

Bundler.require

require './backend/app.rb'
run SaveToRedis