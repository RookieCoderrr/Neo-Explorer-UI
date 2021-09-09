#!/bin/sh
docker stop vueAppTestNet
docker container rm vueAppTestNet
docker rmi neo-explorer-testnet
docker image build . -t neo-explorer-testnet
docker run -itd --name vueAppTestNet -p 8080:80 neo-explorer-testnet
