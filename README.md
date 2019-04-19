# Trellobnb

# Structure & General Idea
- Container Element Contains Column Elements
- Container Elements Contains Card Elements
- Modify Card/Column Events Will Be Done On Separate Forms
- Drag & Drop is Data Driven: When card is dropped onto column target, previous and next columns are updated with data (no removal of dom nodes)

# Quick Start
## Preinstallation For Polymer Test Suite
1. npm install -g web-component-tester
2. bower install Polymer/web-component-tester --save
3. npm install http-server -g

## Installation
1. clone this repo
2. npm install

## Run
Type the following in terminal to spin up server.
```
http-server
```

# Tests
- install polymer cli
- Run tests on chrome only
```
polymer test -l chrome
```

## Test Strategy
- Test for default attributes
- Test for variable data passed into attributes
- Test for methods

## Important Links
- https://github.com/Polymer/tools/tree/master/packages/web-component-tester
- https://polymer-library.polymer-project.org/3.0/docs/tools/tests
