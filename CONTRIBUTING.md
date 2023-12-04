
## Types of contributions 

We welcome contributions from anyone. Here are the kinds of contributions you could make:

### :question: Ask a question

If you have questions about how to use the visualizations, please read the [documentation](https://inab.github.io/oeb-visualizations/) first. If you still have questions, please open a new [discussion](https://github.com/inab/oeb-visualizations/discussions)

### :bulb: Suggest new features, components, updates, ideas, etc. 

If you'd like to suggest new features or updates, have a new idea for a component, or want to share something, join us in [discussions](https://github.com/inab/oeb-visualizations/discussions).

### :point_up: Report a Bug 

If you find a bug, please report it in the [issues section](https://github.com/inab/oeb-visualizations/issues).

### :lady_beetle: Fix a bug 

If you want to fix a bug, please read the "Submitting changes conventions" section first. After that, you can follow the steps below:
- Open an issue describing the bug you want to fix. Use the "bug" label. 
- Create a new branch from the `dev` branch. The name of the branch should be `fix/issue-number` where `issue-number` is the number of the issue you opened in the previous step.
- Make your changes.
- Open a new pull request. Ensure the PR description clearly describes the problem and solution. Include the issue number.
- Wait for the PR to be reviewed and merged. 

> :warning: If the bug is a small typo or a small fix, you can directly open a pull request without opening an issue first. Ensure the PR description clearly describes the changes made.
 
### :wrench: Improve code quality 

If you want to refactor code or improve code quality, please read the "Submitting changes conventions" section first. After that, you can follow the steps below: 
- There is no need to open an issue first. You can still open one if you want to discuss the changes with the maintainers and other contributors. Use the "refactor" label.
- Create a new branch from the `dev` branch. The name of the branch should be `refactor/issue-number` where `issue-number` is the number of the issue you opened in the previous step. If the issue number is not available, use a descriptive name for the branch.
- Make your changes. 
- Open a pull request. Ensure the PR description clearly describes the changes made. 
- Wait for the PR to be reviewed and merged.

### :sparkles: Add a new feature 

If you want to add a new feature, please read the "Submitting changes conventions" section first. After that, you can follow the steps below: 
- Open an issue describing the feature you want to add. Use the "enhancement" label. Use this issue to discuss the feature with the maintainers and other contributors.
- Create a new branch from the `dev` branch. The name of the branch should be `feature/issue-number` where `issue-number` is the number of the issue you opened in the previous step. 
- Make your changes. 
- Open a new pull request. Ensure the PR description clearly describes the problem and solution. Include the issue number. 
- Wait for the PR to be reviewed and merged. 

### :memo: Fix typo errors or improve documentation  

In this case, it is not necessary to open an issue first. You can directly open a pull request. Ensure the PR description clearly describes the changes made.

## Coding and Git conventions  

### Coding style

- Use [Prettier](https://prettier.io/) to format your code. Use the following options: 
    ```js
    const prettierConfig = {
        printWidth: 80,
        useTabs: true, // we are using tabs! http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/
        trailingComma: 'es5',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'always',
        proseWrap: 'never',
        htmlWhitespaceSensitivity: 'css',
        endOfLine: 'lf',
        semi: true,
        singleQuote: true,
    }
    ``` 
    For a more detailed explanation of these options, check the [Prettier documentation](https://prettier.io/docs/en/options.html). 
    For a more detailed explanation of why we are using Prettier instead of a custom style guide, check [this article](https://prettier.io/docs/en/why-prettier.html). 

- Use [StyleLint](https://stylelint.io/) to lint your CSS. Use the following options: 
    ```js
    module.exports = {
        customSyntax: 'postcss-html',
        extends: [
            'stylelint-config-standard',
            'stylelint-config-recommended-vue',
            'stylelint-config-prettier',
        ],
        rules: {},
    };
    ``` 
    For a more detailed explanation of these options, check the [StyleLint documentation](https://stylelint.io/user-guide/configuration/).



### Git branching model 

We use the [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) branching model.


### Git commit messages 

- Use clear and descriptive commit messages. 
- Use Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/) format or similar. You can use a tool like [commitizen](https://commitizen-tools.github.io/commitizen/) to help you with this and write awesome commit messages.  
- If the commit is related to an issue, include the issue number in the commit message. 
- If the commit closes an issue, include `Closes #issue-number` in the commit message. 
- If the commit is a fix for a bug, include `Fixes #issue-number` in the commit message. 
- If the commit is a new feature, include `Adds #issue-number` in the commit message. 
- If the commit is an update, include `Updates #issue-number` in the commit message. 
- If the commit is a breaking change, include `BREAKING CHANGE` in the commit message. 

