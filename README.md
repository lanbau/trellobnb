# Trellobnb

# Structure & General Idea
- Container Element Contains Column Elements
- Container Elements Contains Card Elements
- Modify Card/Column Events Will Be Done On Separate Forms
- Drag & Drop is Data Driven: When card is dropped onto column target, previous and next columns are updated with data (no removal of dom nodes)

# Quick Start
## Installation of project
1. clone this repo
2. npm install
3. npm run dev

# Tests (Required)
```
npm install -g web-component-tester
bower install Polymer/web-component-tester --save
yarn global add polymer-cli
```
- Run tests on chrome only
```
npm run test
```

## Test Strategy
- Test for default attributes
- Test for variable data passed into attributes
- Test for methods

## Important Links
- https://github.com/Polymer/tools/tree/master/packages/web-component-tester
- https://polymer-library.polymer-project.org/3.0/docs/tools/tests
