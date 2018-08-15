# Gulpbuild project
Convenient assembly of site layout projects. Gulp, Stylus, Pug.

## Remarks
In the project there is no minimization of images, because I use external software (for Windows).

## Installation
Install soft: Node.js - https://nodejs.org/en/ Git - https://git-scm.com/download  
Create a project in your IDE.  
Copy the project with git: git+https://github.com/allardcool/gulpbuild.git  
Install the packages through npm:  

```
$ npm install -g gulp
$ npm install -g gulp-cli
$ npm install -g bower
$ npm install
$ bower install
```

## Usage

### Default start build project
```
$ gulp
```
### Creating an archive for production (with minimized files)
```
$ gulp production
```
### Creating backups of project sources
```
$ gulp backup
```
### Сleaning the production directory
```
$ gulp clean
```
