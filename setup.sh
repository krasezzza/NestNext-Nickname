#!/bin/bash

echo ""
echo "****************************"
echo "*   PROJECT SETUP START!   *"
echo "****************************"
echo ""
sleep 2

if [ -d "./node_modules" ];
then
  echo "Clearing the 'node_modules' directory..."
  rm -rf ./node_modules
  echo ""
  sleep 1
fi

if [ -f "./package-lock.json" ];
then
  echo "Clearing the 'package-lock.json' file..."
  rm -f ./package-lock.json
  echo ""
  sleep 1
fi

if [ -d "./backend/dist" ];
then
  echo "Clearing the 'backend/dist' directory..."
  rm -rf ./backend/dist
  echo ""
  sleep 1
fi

if [ -d "./backend/coverage" ];
then
  echo "Clearing the 'backend/coverage' directory..."
  rm -rf ./backend/coverage
  echo ""
  sleep 1
fi

if [ -d "./backend/node_modules" ];
then
  echo "Clearing the 'backend/node_modules' directory..."
  rm -rf ./backend/node_modules
  echo ""
  sleep 1
fi

if [ -f "./backend/package-lock.json" ];
then
  echo "Clearing the 'backend/package-lock.json' file..."
  rm -f ./backend/package-lock.json
  echo ""
  sleep 1
fi

if [ -f "./backend/.env" ];
then
  echo "Backend/ENV file was previously configured!"
else
  cp ./backend/.env.example ./backend/.env
  if grep -Fxq "NEST_ENV=dev" ./backend/.env;
  then
    echo "Backend/ENV VARS are already configured!"
  else
    sed -i "s/NEST_ENV=/NEST_ENV=dev/g" ./backend/.env
    echo "Backend/ENV VARS are now configured."
  fi
fi
echo ""
sleep 2

if [ -f "./backend/database.sqlite" ];
then
  echo "Backend/SQLite was previously configured!"
else
  cp ./backend/database.sqlite.example ./backend/database.sqlite
  echo "Backend/SQLite is now configured."
fi
echo ""
sleep 2

if [ -d "./frontend/node_modules" ];
then
  echo "Clearing the 'frontend/node_modules' directory..."
  rm -rf ./frontend/node_modules
  echo ""
  sleep 1
fi

if [ -f "./frontend/package-lock.json" ];
then
  echo "Clearing the 'frontend/package-lock.json' file..."
  rm -f ./frontend/package-lock.json
  echo ""
  sleep 1
fi

echo "Installing node_modules..."
npm install
echo ""
sleep 2

echo "Installing backend/node_modules..."
npm install --prefix backend
echo ""
sleep 2

echo "Installing frontend/node_modules..."
npm install --prefix frontend
echo ""
sleep 2

echo "Running backend test coverage..."
npm run test:cov --prefix backend
echo ""
sleep 2

echo "Starting up the dev server..."
npm run dev
echo ""
sleep 2
