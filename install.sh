#!/bin/bash

# install client dependencies
yarn install
# install server dependencies
cd ./src/server && yarn install