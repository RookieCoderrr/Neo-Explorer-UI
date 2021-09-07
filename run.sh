#!/bin/sh
docker stop vueApp
docker container rm vueApp
docker rmi neo-explorer
docker image build . -t neo-explorer
docker run -itd --name vueApp --link service_http_test --net network -p 8080:80 neo-explorer
