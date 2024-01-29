# nestnext-nickname
Nest/Next sample app for registering nicknames

## Requirements
You need to have at least ***Node v18*** installed on your system in order to run this project. Also, you should use some ***UNIX***-like development environment, because it isn't tested on Windows directly and it can be run easily on **WSL, Linux or MacOS**.

## Configuration

### Automatic
For convienience, you can run the following script which will configure the project with all needed stuff for you right away:
```shell
bash setup.sh
```

### Manual

After cloning this repository on your local machine, you should do the following things in order to make it up and running:
```shell
# still in project home directory
npm install

# after npm install finishes successfully
cd ./backend

# run it again in the /backend directory
npm install

# create copies of these files without .example
cp .env.example .env
cp database.sqlite.example database.sqlite
```

Open the .env file and add the following value to the environment variable:
```shell
NEST_ENV=dev
```

Get back into the project directory and proceed with the next steps:
```shell
# back to project directory
cd ../

# go to the frontend directory
cd ./frontend

# install the node_modules
npm install
```

And you are good to start up the dev server by executing:
```shell
# back to project directory
cd ../

# start up the dev server
npm run dev
```

## Application

In case there are no errors in the Terminal, you can open a new browser tab with the following URL [http://localhost:3000](http://localhost:3000)

On your screen, you should see the input field for registering nicknames. Now you can test the functionality and let me know whether everything is running fine.

The unit test code coverage can be checked by these commands:
```shell
npm run be-test
npm run be-tcov
```

Cheers :)
