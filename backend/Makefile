run-redis:
	docker volume create my-data-volume # or any name
	docker run -d --rm -v my-data-volume:/data --name my-redis-container -p 6379:6379 redis:6.2-rc-alpine
