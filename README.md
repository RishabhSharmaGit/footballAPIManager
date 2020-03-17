# Premier League Football API Manager

This API Manager fetches, updates and add new teams to the Premier League Football Database.

## Configuration

You can modify `./config.json` file to change port number, relative path of teams JSON Data and  relative path of test teams JSON Data.

```json
{
    "port": 5000,
    "teamsDataPath": "./data/teams.json",
    "teamsTestDataPath": "./data/teams.test.json"
}
```


## Installation

Use [npm](https://www.npmjs.com/) package manager to install and run this project.
Run following commands at root dir:

```bash
npm install
npm run start
```

TO run this project in dev mode, run following command after installation:

```bash
npm run start:dev
```

## Testing

Unit testing can be performed by running following command:

```bash
npm run test
```

## Technical Overview

Development is accomplished using:

- typescript
- express
- ts-node
- nodemon
- eslint
- jest
- ts-jest
