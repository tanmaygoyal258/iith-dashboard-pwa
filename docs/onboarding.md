# Onboarding Docs

This file gives a high-level overview of the architecture of the project and contains some resources for onboarding a new member to the team.

If any links are broken, please use either the Wayback Machine or update the links.

Note that we want both the code and the docs to be as concise as possible while being useful, readable and maintainable.

**If you are contributing to this project, read this document.**

**This document will save you and us a lot of time by helping you understand the necessary basics and then setting up your development environment correctly.**

## About the Project

The main tools used in the project are as follows:

- HTML/CSS/JS
- React
- npm and nodejs

Other knowledge required will be:

- REST APIs
- Progressive Web Apps and Service Workers
- Git
- CI/CD

## Onboarding Roadmap
- Get a high level overview of the expected behavior
- Learn how to setup and manage the project
- Get a high level overview of the implementation
- Learn the details of the implementation

## Basic Resources

These resources will get you upto speed on the project.

### Design Philosophy

- [10 Principles of Effective Web Design](https://www.smashingmagazine.com/2008/01/10-principles-of-effective-web-design/)
- [Fast Software, the Best Software](https://craigmod.com/essays/fast_software/)
- [What nobody tells you about documentation](https://www.divio.com/blog/documentation/)

### JS

- [A re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

### React

- [Getting Started with React](https://www.taniarascia.com/getting-started-with-react/)
- [Dont Eject!](https://spin.atomicobject.com/2020/01/28/eject-create-react-app-drawbacks/)

### REST APIs

- [What is REST](https://restfulapi.net/)
- [Best Practices for Designing a Pragmatic RESTful API](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)

### PWAs

- [Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

### CI/CD

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)



## More Resources

You don't need to read all the outlined stuff; a lot of them are there for the sake of completeness. But each of teaches something about how the project was planned and built.

### JS

- [ESlint Guide](https://blog.geographer.fr/eslint-guide)
- [History of JavaScript Package Managers](https://medium.com/javascript-in-plain-english/an-abbreviated-history-of-javascript-package-managers-f9797be7cf0e)

### Git and GitHub

- [Get Started with Git](https://alistapart.com/article/get-started-with-git/)
- [GitHub Actions](https://gabrieltanner.org/blog/an-introduction-to-github-actions)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) - **Read this**

### Tests
- [Write Tests](https://kentcdodds.com/blog/write-tests)
- [How I Test](https://blog.nelhage.com/2016/12/how-i-test/)
- [Questions to ask yourself when writing tests](https://charemza.name/blog/posts/methodologies/testing/questions-to-ask-yourself-when-writing-tests/)


## Project Guidelines
### General Coding
- Fix each broken window (bad design, wrong decision, or poor code) as soon as it is discovered.
- Test ruthlessly. Write docs for every change.
- Document all decisions using ADRs; decisons that seem arbitrary down the lane are alway the biggest source of confusion.
- These guidelines may--and probably should--change.
- Write code that is as functional as possible.

### Function Guidelines
- Should be sensibly named
- Should have a single responsibility
- Should not be longer than 100 lines at max; smaller functions are usually better
- Should be idempotent and pure if possible

## Source control with Git

### Installing and configuring git
- Install git in your OS:

    - Linux: Install the package git

        ```shell
        $ sudo apt-get install git
        ```

    - Windows, Mac OSX: Download from [the git website](http://git-scm.com).

    - More info in [GitHub's git installation instructions](http://help.github.com/git-installation-redirect).

- Check if git is installed correctly.

    ```shell
    $ git --version
    git version 2.21.2
    ```

- Configure git correctly:

    ```shell
    $ git config --global user.name "My Full Name"
    $ git config --global user.email myAccount@gmail.com
    $ git config --global -l
    user.name=<user name and surname >
    user.email=<user email address>
    ```

    - Warning: the field `user.name` is your full name, *not your username*.

    - Note: the field `user.email` should match an email address of your github account.

    - More info on [GitHub](http://help.github.com/git-email-settings/).

- Get a github account

    - And add your public key on github: [Follow these instructions](http://github.com/guides/providing-your-ssh-key).

- To learn more about git, read the free book [Pro Git](http://progit.org/book/) or other resources outlined above.

- You can install a git gui like gitkraken for convenience.

### Getting the source locally
- **Clone your fork locally:**

    ```shell
    # clone the repository
    $ git clone git@github.com:iith-dashboard/iith-dashboard-pwa
    $ cd iith-dashboard-pwa
    $ ls
    ```

    - By default you will be looking at the sources of the master branch, which cusually is not very interesting.

        - Use git checkout to switch to a branch that is currently being worked on or even the release branches:

            ```shell
            $ git checkout <branch name> # i.e git checkout develop
            ```            
### Working with git
- First make a topic branch:

    ```shell
    $ git checkout master
    $ git checkout -b myFirstTopic
    ```

    - Don't litter your local `master` branch: keep it equal to `remotes/upstream/master`

    - 1 branch can have only 1 pull request, because the pull requests evolves as you add more commits on that branch.

- Make changes, run, test and document them, then commit them:

    ```shell
    $ git commit -m "Fix typo in documentation"
    ```

- Push those commits on your topic branch to your fork

    ```shell
    $ git push origin myFirstTopic
    ```

- Get the latest changes from the remote repository

    - Set your master equal to the remote master:

        ```shell
        $ git fetch origin
        $ git checkout master
        # Warning: this deletes all changes/commits on your local master branch, but you shouldn't have any!
        $ git reset --hard origin/master
        ```

    - Start a new topic branch and set the code the same as the blessed master:

        ```shell
        $ git fetch origin && git checkout -b mySecondTopic && git reset --hard origin/master
        ```

    - If you have a long-running topic branch, merge master into it:

        ```shell
        $ git fetch origin
        $ git merge origin/master
        ```

        - If there are merge conflicts:

            ```shell
            $ git mergetool
            $ git commit
            ```

            or

            ```shell
            $ git status
            $ gedit conflicted-file.txt
            $ git add conflicted-file.txt
            $ git commit
            ```

            Many people get confused when a merge conflict occurs, because you're *in limbo*.
            Just fix the merge conflicts and commit (even if the git seems to contain many files),
            only then is the merge over. Then run `git log` to see what happened.
            The many files in the merge conflict resolving commit are a side effect of non-linear history.

- You may delete your topic branch after your pull request is closed (first one deletes remotely, second one locally):

    ```shell
    $ git push origin :myTopicBranch
    $ git branch -D myTopicBranch
    ```

- Tips and tricks

    - To see the details of your local, unpushed commits:

        ```shell
        $ git diff origin...HEAD
        ```
## Miscellaneous Links

Random links that we used for dev that are not very important but are chucked here for completeness' sake.
