# OpenEBench Visualizations

Collection of Vue components for data visualization in [OpenEBench](https://openebench.bsc.es/). 

- :magic_wand: Go to the [live demo](https://inab.github.io/oeb-visualizations-demo/) to see the components in action.
- :open_book: Check the [documentation](https://inab.github.io/oeb-visualizations/) for details on how to use the components.
- :package: This package is available through [npmjs](https://www.npmjs.com/package/@inb/oeb_visualizations). 


## Installation

To install the package run: 

```bash
npm install @inb/oeb_visualizations
``` 
## How to contribute 

If you want to contribute to this project, please read the [contributing guidelines](/CONTRIBUTING.md) first.

## Development 

This project is built using [Vue.js](https://vuejs.org/). The components are written in [Vue](https://vuejs.org/) and the bundling is done using [Rollup](https://rollupjs.org/). The rollup configuration is in the `rollup.config.js` file and the main entry point is the `src/index.js` file, all the components are exported from this file. 
The components are written in the `src/components` folder. Each component should be in a separate folder and should contain the `.vue` file and, optionally, a `.scss` file. In order to be used in other applications, the package should be built, which creates a `dist` folder with the compiled files.

The documentation is built using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). The content of the documentation is written in markdown and should be added to the `docs` folder. 
The configuration of the documentation is in the `mkdocs.yml` file. This file contains the structure of the documentation, including navigation, the theme used, etc. More information about how to configure the documentation can be found in the [documentation](https://squidfunk.github.io/mkdocs-material/reference/).

### How to add a new visualization.

If you want to add a new visualization, you should create a new component for it. Follow the steps below:

- Create the new component in the `src/components` folder. A component can be written in only one file or, if it is complex, it can be divided into smaller components in a folder.  
- Add the new component to the `index.js`, as following: 

    ```js
    import newComponent from './components/newComponent.vue'

    export {
        newComponent,
        ...
    }
    ```

> If the new component is a complex component, it should be divided into smaller components. In this case, the `index.js` file should export the smaller components and the main component. 

> The documentation should be updated to include the new component.

### How to document a new component.

To document a new component, add the new component to the documentation as a single file in the `docs/components` folder. Documentation is written in markdown and should contain at least the following sections: 

- Description of how the data being represented. 
- How to use it. 
- Example of usage. 
- Props and events. 

### How to build the package locally. 

To build the package locally, run: 
```bash
npm run build
```
This will create a `dist` folder with the compiled files.
The component will be available for other applications running locally to use. 
To use the component in another application, you should link the package locally. To do so, run: 
```bash
npm link
```
Then, in the application where you want to use the component, run: 
```bash
npm link @inb/oeb_visualizations
```
This will link the local package to the application.

### How to serve the documentation locally.

The documentation is built using [mkdocs](https://www.mkdocs.org/). To serve the documentation locally, run:
```bash
mkdocs serve
```
This will start a local server and the documentation will be available at `http://localhost:8000/`.


## Publishing 

### Publishing a new version of the package to npm

To publish a new version of the package to [npm](https://www.npmjs.com), follow the steps below:

- Update the version in the `package.json` file. If all commit messages follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard, you can use the `cz bump --version-scheme semver` command to update the version and the `CHANGELOG.md` file. 
- Run the `npm run build` command to build the package. 
- Run the `npm publish` command to publish the package to npmjs.

This package is published under the `@inb` scope as `@inb/oeb_visualizations`. 
The package is available at [https://www.npmjs.com/package/@inb/oeb_visualizations](https://www.npmjs.com/package/@inb/oeb_visualizations).

### Publishing the documentation

The documentation is built and deployed to the `gh-pages` branch using GitHub Actions. Each time a new commit is pushed to the `main` branch, the documentation is built and deployed to the `gh-pages` branch.  
The documentation is available at [https://inab.github.io/oeb-visualizations/](https://inab.github.io/oeb-visualizations/).
