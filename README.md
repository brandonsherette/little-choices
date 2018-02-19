# Little Choices

# Latest Version
## v0.1.0
### Features
- Intial Build.

## Install
To install all core dependecies, use the install command.
```npm install```

## Run Development Server
To run a development server with hot reloading, use the dev command.
```npm run dev```
The site can be then viewed at "http://localhost:8080/".

## Build App 
To build a production build of the application, use the build command.
```npm run build```
The build will then be in the **root/build/** directory.

## Export App 
To build the app as an exported application (used to chain multiple react redux applications together), 
use the export-build command.
```npm run export-build```
The build will then be in the **root/dist/** directory.

## Watch App
To have webpack rebuild the app for development purposes without running a development server, use the watch command.
```npm run watch```

## Watch Export App
To have webpack rebuild the app for development purposes without running a development server and be used in the context of the export app, 
use the watch-export command.
```npm run watch-export```

## Compile App Wide SCSS Files
To compile app wide scss files, use the sass command.
```npm run sass```