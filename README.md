# React Components for VHX Quartz

https://vhx-quartz-react.firebaseapp.com


## Installation

```bash
npm install @vhx/quartz-react
```


## Usage

First include `quartz.css`, `components.css`, `quartz-icons.css`, and the css files from `dist/` for any components you intend to use.

Then import the components:
```jsx
import { Button, Tag, util } from '@vhx/quartz-react';

const MyComponent = () => (
  <div>
    <Button>Hello</Button>
  </div>
);
```

For demos and code examples, run `npm start` and open up `localhost:3000` in your browser.


## NPM Scripts

- **`npm start`**: This is the main script you'll use while developing components for quartz-react. It starts a local server to display the demo ui with live reloading and runs the build process.
- **`npm run build`**: Run this before any release. It transpiles the source code and puts the output in `dist/`.
- **`npm run deploy`**: This deploys the demo website (currently to firebase)
- **`npm run lint`**: This script ensures that the component code passes eslint. Run this before making a PR.
- **`npm test`**: This script runs the tests for all the components and utilities in a jsdom environment.
- **`npm run dev` and `npm run serve`**: Together, these two scripts form the start script. `dev` transpiles and watches the source code for changes and `serve` creates a local server to display the demos.


## Folder Hierarchy
```
build/
  build-css.js                  # Copies css from /docs/css to /dist and prepends version & hash
  rollup.config.js              # Configuration for the bundler to output js to dist/
  rollup.demo-config.js         # Same as above, but for the demo site (/docs/js)
components/
  [Component]/                  # At minimum contains the following files, but can be extended as necessary
    index.js                    # This just exports your [Component].jsx
    [Component].jsx             # The main component file
    [Component].test.jsx        # Unit tests for the component
  util/                         # Utility functions shared by components
demo/
  sections/                     # Sections of the demo page with code and examples
  ui/                           # Components specific to the demo page that are not included in quartz-react
  index.jsx                     # The demo page itself (ie. what is seen on localhost:3000)
docs/                           # The github pages website. `demo/index.jsx` gets compiled into here.
index.js                        # Every component that is exported in quartz-react
```


## How to Create a New Component

1. Create a branch for the new component
2. In `components/` add a folder for your component that contains the following files:
    - index.js
    - [YourComponent].jsx
    - [YourComponent].test.jsx
3. In the root level `index.js`, create a named export for your component.
4. In `demo/sections/` create a file to demo your component (by convention, it should be `demo/sections/[YourComponent].jsx`). It should export a react component that makes use of the demo UI components (see below). If your demo makes use of props, display them in a `<PropTypeTable />`.
5. In `demo/index.jsx` import the demo you exported from the file in step 4, and add it to the `sections` object. This will include it in the sidebar navigation as well as render it to the page.
6. Create a pull request and merge into master when ready. Then delete the branch.
7. Run `npm version patch` (or `minor` or `major`, as appropriate), then run `npm run build`, then publish to npm.


## Documenting Components

In addition to the documentation in demo site, components should be self-documenting. Using `propTypes` and `defaultProps` help with this effort. A third, non-standard property called `propDescriptions` may additionally be used to document props.
If any of these statics are defined on your component, use a `<PropTypeTable />`. For example:

```jsx
// in components/MyComponent/MyComponent.jsx
// ---------------------------------------------
const MyComponent = ({ title }) => <h1>{title.slice(0, 50)}</h1>;

MyComponent.propTypes = {
  title: PropTypes.string,
};

MyComponent.defaultProps = {
  title: 'Hello World',
};

MyComponent.propDescriptions = {
  title: 'A brief title, truncated at 50 characters',
};

// in demo/sections/MyComponent.jsx
// ---------------------------------------------
const MyComponentDemo = () => (
  <div>
    <DemoRow>
      <Title>MyComponent</Title>
      <Details>Some documentation for your component goes here...</Details>
    </DemoRow>
    <DemoRow>
      <PropTypeTable component={MyComponent} />
    </DemoRow>
  </div>
);
```

## Demo UI Components

Component demo files (`demo/sections/*.jsx`) should export a component containing `<DemoRow>`s. These accept an optional `code` prop that's a string of code to display on the right side of the page.

Follow the example from the `Text` component's demo for the simplest example setup.
