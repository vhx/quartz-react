# React Components for VHX Quartz

## Installation

```bash
npm install @vhx/quartz-react
```


## Usage

First include `quartz.css` and the css files from `dist/` for any components you intend to use.

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
- **`npm run lint`**: This script ensures that the component code passes eslint. Run this before making a PR.
- **`npm test`**: This script runs the tests for all the components and utilities in a jsdom environment.
- **`npm run dev`, `npm run serve`, and `npm run css -- --watch`**: Together, these scripts form the start script. `dev` transpiles and watches the source code for changes and `serve` creates a local server to display the demos. `css` compiles sass.


## Folder Hierarchy
```
build/
  build-css.js                  # Copies css from demo/public/css to /dist and prepends version & hash
  rollup.config.js              # Configuration for the bundler to output js to dist/
  rollup.demo-config.js         # Same as above, but for the demo site (/demo/public/js)
components/
  [Component]/                  # At minimum contains the following files, but can be extended as necessary
    index.js                    # This just exports your [Component].jsx
    [Component].jsx             # The main component file
    [Component].test.jsx        # Unit tests for the component
    [Component].scss            # component-specific styles
  util/                         # Utility functions shared by components
styles/
  partials/
    base.scss                   # Widely used styles throughout all components.
    normalize.scss              # CSS reset/normalize
  core.scss                     # Combines the component specific scss partials and exports to core.css
  quartz-react.scss             # Combines the partials and every single component style, exports to quartz-react.css
  variables.scss                # Variables used in any stylesheet, such as colors.
demo/
  public/                       # Assets to be used by the demo page
  src/
    sections/                   # Sections of the demo page with code and examples
    ui/                         # Components specific to the demo page that are not included in quartz-react
    index.jsx                   # The demo page itself (ie. what is seen on localhost:3000)
coverage/                       # Generated code coverage reports for component tests
  [Component]/
    [Component].jsx.html
    [Component].test.jsx.html
    index.html
  base.css                      # code coverage css
  index.html
  prettify.css
  prettify.js
  sort-arrow-sprite.png
  sorter.js
dist/
  css/
    [Component].css             # Component specific styles output. (core.css must be used in this scenario)
    core.css                    # All the minimum necessary styles for any component to render.
    quartz-react.css            # The kitchen sink of quartz-react style components available for use.
index.js                        # Every component that is exported in quartz-react
```


## How to Create a New Component

1. Create a branch for the new component
2. In `components/` add a folder for your component that contains the following files:
    - index.js
    - [YourComponent].jsx
    - [YourComponent].test.jsx
3. In the root level `index.js`, create a named export for your component.
4. In `demo/src/sections/` create a file to demo your component (by convention, it should be `demo/src/sections/[YourComponent].jsx`). It should export a react component that makes use of the demo UI components (see below).
5. In `demo/src/index.jsx` import the demo you exported from the file in step 4, and add it to the `sections` object. This will include it in the sidebar navigation as well as render it to the page.
6. Create a pull request and merge into master when ready. Then delete the branch.
7. Run `npm version patch` (or `minor` or `major`, as appropriate), then run `npm run build`, then publish to npm.


## Demo UI Components

Component demo files (`demo/src/sections/*.jsx`) should export a component containing `<DemoRow>`s. These accept an optional `code` prop that's a string of code to display on the right side of the page.

Follow the example from the `Text` component's demo for the simplest example setup.

## SCSS and CSS options

There are a few ways to use components and styles with your project, by individual component or by importing all styles for all components.

We recommend using all styles to begin with.  If so, you will only need to use quartz-react.css wherever you are linking to your stylesheets, which includes all of the core styles.

If you would like to cherry pick styles and specific components, you will need to import the [Component].css in the components that you are building and core.css wherever you're importing all of your other stylesheets from into the head of your document.
