# The National Archives Frontend

A collection of components that can be used on TNA projects.

This repository should hold all the JavaScript and SCSS source files required for all the frontend styles along with tests and expected markup.

## Output

The source files will be compiled down to a NodeJS package and deployed to [NPM](https://www.npmjs.com/). The package will contain:

- All the JavaScript and SCSS source files which can be imported into a projects source code and compiled by the project (which will allow for tree shaking and application specific modifications)
- An AMD/UMD/IIFE (TBD) ES5 JavaScript file which can be included with a normal `<script>` element
- A single CSS file containing all the styles which can be included with a normal `<style>` element
- The Nunjucks templates for each component that might be required in other projects such as prototyping tools (other implementations can be made such as [Jinja templates](https://github.com/nationalarchives/tna-frontend-jinja))

## Component resources

Each component in this repository should contain:

- Nunjucks template - only used to display the component within the examples page and aid development
- SCSS - which could either be imported as a standalone styles declaration or as part of the compiled output
- JavaScript (ESNext) - if there is any progressive enhancement required on the component
- Options/properties - a list of the configurable properties of the component and their types
- Test scenarios - a variety of configurations and their expected outputs which can be used by either this repository or other implementations of the components (e.g. Jinja)

## Technologies

- Webpack - compilation of JavaScript and CSS
- Storybook - allow viewing and testing of components

## Relationship to other resources

### System context

```mermaid
C4Context
    Person(dev, "Developer", "TNA developer")
    System_Ext(github, "GitHub", "Repositories for source files")
    System_Ext(npm, "NPMJS", "Hosts NodeJS packages")
    System_Ext(pypi, "PyPi", "Hosts Python packages")
    Container(app, "Application", "Example application")
    System_Ext(pypi, "PyPi", "Hosts Python packages")

    Rel(dev, github, "commits to", "git")
    UpdateRelStyle(dev, github, $offsetX="-30", $offsetY="-30")
    Rel(github, npm, "publishes to", "npm")
    Rel(github, pypi, "publishes to", "pip")
    Rel(app, npm, "consumes", "npm")
    Rel(app, pypi, "consumes", "pip")

    UpdateLayoutConfig($c4ShapeInRow="2")
```

### Component diagram

```mermaid
C4Context
    Person(dev, "Developer", "TNA developer")

    %% Boundary(developer_machine, "Developer machine", "boundary") {
    %%     System(docker, "Docker")
    %% }

    Boundary(github, "GitHub", "boundary") {
        Boundary(github_jinja, "Jinja templates", "repository") {
            Container(github_jinja_source, "Jinja templates")
        }

        Boundary(github_frontend, "Frontend styles", "repository") {
            Container(github_frontend_source, "Frontend styles", "git repository")
        }

        Boundary(github_application, "Application", "repository") {
            Container(github_application_source, "Application source code")
            Component(github_application_image, "Application docker image", "GitHub image registry")
        }
    }

    Boundary(npm, "NPMJS", "boundary") {
        Component(npm_package, "Frontend styles")
    }

    Enterprise_Boundary(aws, "TNA AWS", "boundary") {
        Container(app, "Application")
    }

    Boundary(pypi, "PyPi", "boundary") {
        Component(pypi_package, "Jinja templates")
    }

    Rel(dev, github_frontend_source, "commits to")
    UpdateRelStyle(dev, github_frontend_source, $offsetX="-80", $offsetY="-80")
    Rel(github_frontend_source, npm_package, "publishes", "GitHub action")
    UpdateRelStyle(github_frontend_source, npm_package, $offsetX="-40", $offsetY="-40")

    Rel(dev, github_jinja_source, "commits to")
    UpdateRelStyle(dev, github_jinja_source, $offsetX="-15", $offsetY="-80")
    Rel(github_jinja_source, github_frontend_source, "consumes")
    UpdateRelStyle(github_jinja_source, github_frontend_source, $offsetX="-40", $offsetY="-15")
    Rel(github_jinja_source, pypi_package, "publishes", "GitHub action")
    UpdateRelStyle(github_jinja_source, pypi_package, $offsetX="-110", $offsetY="-310")

    Rel(dev, github_application_source, "commits to")
    UpdateRelStyle(dev, github_application_source, $offsetX="-105", $offsetY="-250")
    Rel(github_application_source, github_application_image, "creates", "GitHub action")
    UpdateRelStyle(github_application_source, github_application_image, $offsetX="-90", $offsetY="-20")

    Rel(github_application_image, npm_package, "consumes", "GitHub action")
    UpdateRelStyle(github_application_image, npm_package, $offsetX="-50", $offsetY="-10")
    Rel(github_application_image, pypi_package, "consumes", "GitHub action")
    UpdateRelStyle(github_application_image, pypi_package, $offsetX="80", $offsetY="-10")

    %% Rel(dev, docker, "uses")
    %% Rel(docker, npm_package, "consumes")
    %% Rel(docker, pypi_package, "consumes")

    Rel(app, github_application_image, "consumes")
    UpdateRelStyle(app, github_application_image, $offsetX="255", $offsetY="-130")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="2")
```
