### Demo Aurelia.js Application using Webpack5

#### Steps to start the dev server

1. `yarn install`
2. `yarn dev`

#### Steps to build and serve using http-server

1. `yarn install`
2. `yarn build:prod`
3. `yarn serve`


#### Issues found in Dev Server

1. `webpack-dev-server` is assigning a wrong socketUrl. The `__resourceQuery` being used in webpack-dev-server is not a valid url `http:/localhost:8080` *(Note the single '/' after ':')*

  Error message - ![image](https://user-images.githubusercontent.com/30779692/121216531-97142580-c89e-11eb-8e3e-50ae8a1c7551.png)

#### Issues found in the production build 

1. When a page is dependent on some other service (here `home.ts` is dependent on `dialog-service`) the following error is thrown - 
    ![image](https://user-images.githubusercontent.com/30779692/121217852-dc852280-c89f-11eb-916b-081e738cb784.png)
   However, on removing the dependency the page loads fine without any errors.

2. When an element is required in a `view` of a different `view-model` the element doesn't render, however when only the html is required that gets rendered.
  
  In app.ts of this project we are requiring `name-tag` but it didn't render 
|                 |                   |
|---------------- | ------------------|
|![image](https://user-images.githubusercontent.com/30779692/121219345-3803e000-c8a1-11eb-959e-f9081c29d166.png)|![image](https://user-images.githubusercontent.com/30779692/121219151-0723ab00-c8a1-11eb-98b1-4514f18982e9.png)|







