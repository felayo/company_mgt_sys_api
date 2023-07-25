build-image:
	docker image build . -t felayo/winelightPortal

run-image:
	docker run -p 4000:4000 --env-file ./.env felayo/winelightPortal:v1.0.0

up-dev:
	docker-compose up --build

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d 

down:
	docker-compose down 