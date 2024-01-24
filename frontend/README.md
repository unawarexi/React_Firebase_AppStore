# FRONTEND SETUP

## 1 procedures

- npm create vitea@latest --frontend React
- cd into the creted folder and `NPM INSTALL`
- go to the the tailwind css docs to config tailwind `add the -p for auto instal auto prefixer`

- npx tailwindcss -p
  4 install auto prefixer if it didn't auto install or you have error with tailwind installation
- npm install auto-prefixer
- and re run npx tailwindcss -p
- create a `gitignore` to ignore node_modules

## 2 SETING UP ROUTES

- the browerrouter in main.jsx and {routes, route} in APP.jsx serves the path links
- the {suspense} in the App is to withhold the application from rendering
  - due to wrong user links
  - unconfigured specific links
  - helps with waiting for a response using async func.

## 3 File Structuring

#### 3i pages folder

- contains home and other several navigation pages

#### 3ii layouts folder

- contains header and footer and an out let tag
- this makes the footer and header constant while the body changes

## ERRORS ENCOUTERED AND HOW TO FIX

| ERROR ENCOUNTERED | SOLUTION |
| ----------------- | -------- |
| Uncaught Error: Absolute route path "/home/" nested under path "/admin" is not valid. |  `AdminHome` component, make it relative to the "/admin" route (parent route). nested routes should have `index ` not `path`  |
