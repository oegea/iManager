# iManager

This document describes the process of ideating, designing and implementing a (basic but) modern frontend application.

# Development process

The process has been divided into four different phases that are fully documented in this document. Please note that this project follows a waterfall approach, because it needs to be short and only one iteration is expected. 

In case of receiving feedback and having a chance to improve the result, any improvements will be implemented iterating over the same four phases, and a more agile approach would then be adopted. 

# Phases of development

These are the phases that will drive the project:

1. Ideation and definition: Which ranges from the project goal definition, to the user stories writing and the prototype creation.

2. Definition of technology and best practices strategy.

3. Application implementation: This phase includes the project scaffolding creation, testing and implementation.

4. Refining and automation: At this latest stage, the project will be refined and uploaded to a public repository. A basic CI will be also implemented to automate tests execution.

# 1. Ideation and definition

## Project Goal

Offer to the Item Managers an application with which be able to find items on an inventory, and mark their favorites ones. 

All of this with a modern and intuitive user interface, and ensuring that best technical practices are followed during the process.

## Personas

As this is a small project, it has only one persona which it's named as "Item Manager" in the user stories.

## User Stories

### Basic Interface

* **As a:** Item Manager,
* **I want to:** Have a basic and cohesionate user interface,
* **So that:** I can easily navigate through the application.

### List of Items

* **As a:** Item Manager,
* **I want to:** Be able to know existent items reading them from a list,
* **So that:** I can know the title, description, price and e-mail of each item, and also take a look of its photo.

### Items pagination

* **As a:** Item Manager,
* **I want to:** Be able to list items in group of fives, and move between groups (pages),
* **So that:** I can navigate between items in an easier way.

### Search Items

* **As a:** Item Manager,
* **I want to:** Be able to find items by title, description, price or e-mail,
* **So that:** I can easily find items.

### Sort items by title, description, price or e-mail

* **As a:** Item Manager,
* **I want to:** Be able to sort items by title, description, price or e-mail,
* **So that:** I can easily sort items.

### Save items as favourites

* **As a:** Item Manager,
* **I want to:** Be able to mark an item as favourite, from the main list,
* **So that:** I can later recover favourite items.

### Modal showing only title and picture

* **As a:** Item Manager,
* **I want to:** Access my favourite items and know their title and picture,
* **So that:** I can know which are my favourite items.

### Search by title in the modal of favourite items

* **As a:** Item Manager,
* **I want to:** Be able to search by title in my favourite items modal,
* **So that:** I can look for an specific item.

### Remove items from the favourite items list

* **As a:** Item Manager,
* **I want to:** Be able to remove items from my favourite list,
* **So that:** I can remove items that are no longer my favourite ones.

## Prototype

A basic low-fidelity prototype has been created using sketch. 

As prototyping was out of the scope of this project, the effort dedicated to this area has been minimum.

![Low-fidelity prototype](./images/sketch.png)

# 2. Technology and best practices strategy

## Tech stack and dependencies

These are the selected libraries to implement the project:

* **Webpack:** To group all app's files to bundle files.
* **Babel:** To transpile TypeScript, new Javascript features, and other things with compatibility purposes.
* **TypeScript:** To have an environment with types.
* **ReactJs:** As the main framework to build the app interface. To take advantatge of TypeScript, classic class components are used instead of hooks.
* **Axios:** To perform http requests.
* **SCSS:** As a CSS pre-processor.
* **Jest & Enzyme:** To test implemented components.

## Best practices guidelines

There are a lot of good practices that could be implemented during an application development, but in this project we have focused on these topics:

* **Keep everything small:** 

  This means following the SRP in all possible aspects. Being sure that methods, classes, and components are small will increase the application mantainability.
* **Comment methods and complex decisions:** 

  To improve navigation through methods and make future developments easier, each method needs to be documented with JsDocs. 

  Also, code comments must reflect the reason behind complex or not-obvious decisions, instead of describe what's doing the code flow (because the code needs to be self-descriptive).

* **Test everything:** 

  Unit and integration tests are a must in this application. Everything should be tested to ensure that the application works as expected.

* **Use the adapter pattern whenever is possible:** 

  As this is a basic application that could be evolved on a future to use a real api, it's a must to ensure that adaptor pattern is used, specially in those parts that connects the frontend app with third party systems or services.

# 3. Application implementation

This is a memory of all followed steps to implement the final application.

## Project initializing process

### Creating the project

To simplify the number of required tools, `npm` is used as main package manager during all the development process.

As a first step, the project needs to be initialized with `npm init`.

### Webpack and babel installation

Then, `webpack` dependencies need to be installed with the following command: 

- `npm i --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`

Before configuring `webpack`, `babel` has been installed with the following command: 

- `npm i --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript`.

With these libraries, and after configuring them, the application will be able to be bundled and transpiled. 

After installing dependencies, basic `webpack` and `babel` configuration files have been created, and start and build scripts have been also added to the `package.json` file.

### Typescript and React installation

Now that we have `webpack` and `babel`, we need to install `typescript` and `react` dependencies: 

- `npm i typescript react react-dom @types/react @types/react-dom`

### Basic files

To test that everything works as expected, a basic `index.html` file has been created in the project's root path, and an `index.tsx` has been created as the application entry point.

### Axios installation

After testing that the basic project compiling worked as expected, `axios` library has been installed with the following command:

- `npm i axios`

### SCSS

The following libraries have been installed to transpile scss to css using webpack: `style-loader`, `css-loader`, `sass-loader`, `sass`. 

- `npm i --save-dev style-loader css-loader sass-loader sass`

After installing these libraries, webpack's configuration file has been modified to process scss files.

### Testing libraries

Jest and Enzyme are used in this project to write unit and integration tests, to install these libraries, the following command has been executed:

- `npm i --save-dev jest babel-jest enzyme @wojtekmaj/enzyme-adapter-react-17 jsdom jsdom-global @types/jest @types/enzyme`

After installing these libraries, the `test-setup.js` file has been created to configure the enzyme adapter. Also, the `package.json` file has been modified to reference to the just created `test-setup.js` file.

### Project scaffolding

To organize and ensure project tidiness, the following project scaffolding has been configured:

* tests (contained in the root folder, outside the `src` directory)
* components
* constants
* styles
* interfaces
* libs
* api

To ensure that the project has an intuitive approach, internal structure of `tests`, `components`, `constants` and `styles` is very similar, so the developer can know a component's style just looking for the same subfolder path in the `styles` folder, or can access to related tests just looking to the appropiate subfolder path inside the `tests` folder.

### Final refinations

As a final step, a `.gitignore` file has been created to ignore `node_modules` and `dist` directories.

After this, a git repository has been created to work on the project.

## Components creation

The first step in the implementation, has been to develop low-level visual components required in the application.

For this stage, prototype and user stories have been took in consideration to know which components were required.

Components have been implemented by writing unit tests first, then making the real implementation, and finally manual testing the result (invoking the components from a browser) and refining the result and the unit tests.

## Routing and basic logic

## Data Retrieving

## Building the logic and 

# 4. Refining and automation
