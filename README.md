# emuBlog-static

Static html mocks with dummy data.
This "project" is using Gulp and Less.


## installation
First of all you need to install packages necessary for running gulp:
 
`npm install`


##using gulp for less compilation
There is gulpfile.js with two commands: 

###Compile less files
command: `gulp less`

This command recompiles less files and save them into `css/style.css`


###Open Browser Watcher
command: `gulp`

This command will open special window of your default browser, which will automatically refresh every time, you modify your html / less files. 

##what's in the box

I've prepared some CSS libs here by default, you can use them as you wish:

- bootstrap
- bootstrap-select
- font-awesome
- selec2

Use google for more info...

**I didn't add any JavaScript sources!**
Add them into `js` folder.

## How to add your less files

All your less files should be inside `less` folder.
 
To include those files into less compilation, it is necessary to add them into `style.less` file:
`@import "less/my_file.less"`

**`style.less` IS JUST FOR INCLUDING FILES.**

**DO NOT ADD RULES FOR STYLING IN `style.less`.**