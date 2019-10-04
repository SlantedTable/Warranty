# Boostrapped from React Native Quickstart
### Requirements

- [Expo CLI](https://henryharr.is/)

### Installation

To create a new Serverless project.

``` bash
nom install -g expo-cli
```

Install the Node.js packages

``` bash
$ npm install
```

### Usage

To run unit tests on your local

``` bash
$ npm test
```

To start the development server

``` bash
$ npm start
```

To add environment variables to your project

1. Rename `env.example` to `env.yml`.
2. Add environment variables for the various stages to `env.yml`.
3. Uncomment `environment: ${file(env.yml):${self:provider.stage}}` in the `serverless.yml`.
4. Make sure to not commit your `env.yml`.

