require 'rubygems'
require 'bundler'
require "sinatra/reloader"
Bundler.require

require './app.rb'
run SaveToRedis