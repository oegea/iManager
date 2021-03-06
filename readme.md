# iManager

[![Build Status](https://travis-ci.com/oegea/iManager.svg?branch=master)](https://app.travis-ci.com/github/oegea/iManager) 
[![Coverage Status](https://coveralls.io/repos/github/oegea/iManager/badge.svg?branch=master)](https://coveralls.io/github/oegea/iManager?branch=master) 
![Known Vulnerabilities](https://snyk.io/test/github/oegea/iManager/badge.svg) 
[![License](https://shields.io/badge/license-MIT-green)](license.md)
![Code Size](https://shields.io/github/languages/code-size/oegea/iManager) 
![Last Commit](https://shields.io/github/last-commit/oegea/iManager)

## What's this

iManager is a basic frontend application that allows the end-user to navigate through an items catalog.
The main purpose of developing this, was to create a project with `react hooks` and test components with `jest` and `enzyme`. You can read the full project memory [here](./docs/memory.md).

## Required dependencies

In order to compile and modify the project you need to install both dependencies and development dependencies.
`npm` package manager has been used to create this project.

A `npm install` should be enought to install required dependencies.

## Recommended development environment

VSCode with ESLint extension is recommended. 

During the development, the extension [has been configured to automatically fix code style errors](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-4-%E2%80%94-formatting-on-save) following the airbnb style guide.

## Compiling and working

These are the supported commands:
* `npm run build`: Compiles the project and places the output in the `dist` directory.
* `npm start`: Compiles the project and starts it. Changes are automatically detected and hot reloaded.
* `npm test`: Runs tests.
* `npm run test:coverage`: Runs tests with a code coverage report.
* `npm run test:verbose`: Runs tests in verbose mode.
* `npm run test:e2e`: Runs end to end tests.
* `npm run cypress:open`: Starts cypress UI.