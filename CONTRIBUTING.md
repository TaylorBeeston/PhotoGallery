# Contributing Guide

- Contributing is fairly easy. This document shows you how to get started

## General
- The [Codebase Structure](./CODEBASE_STRUCTURE.md) has detailed information about how the various 
files in this project are structured
- This project uses [ESLint](https://eslint.org) and [Prettier](https://prettier.io), so please make
sure to have them set up in your editor.

## Submitting changes

- [Fork the repo](https://github.com/TaylorBeeston/TheBeestonKids/fork)
- Check out a new branch and name it to what you intend to do:
  - Example:

    ```bash
    $ git checkout -b BRANCH_NAME
    ```

    If you get an error, you may need to fetch first by using

    ```bash
    $ git remote update && git fetch
    ```
  - Use one branch per fix / feature
- Commit your changes
  - Please run `yarn lint` before you commit!
  - Please provide a git message that explains what you've done
  - Please make sure your commits follow the 
[conventions outlined here](https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53#file-commit-message-guidelines-md)
  - Commit to the forked repository
  - Example:
    ```bash
    $ git commit -am 'Add some fooBar'
    ```
- Push to the branch
  - Example:
    ```bash
    $ git push origin BRANCH_NAME
    ```

- Make a pull request

If you follow these instructions, your PR will land pretty safely in the main repo!
