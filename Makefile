install:
	npm ci
	cd frontend && npm ci

build:
	cd frontend && npm run build

start:
	./node_modules/.bin/start-server -s ./frontend/dist -p 5001