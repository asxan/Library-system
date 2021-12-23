# LibrarySpa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Docker build 

For building docker image using multifactor docker building use Dockerfile which is in Library-system/library-spa/
Use command:
            -  docker image build if Dockerfile -t {YOUR_DOCKERHUB_USERNAME}/{IMAGE_NAME}:{YOUR_TAG} 

Dockerfile contain two step build with node.js build image in first part and nginx-alpine in second

## Runing in Google Kubernetes Engine

For runing in GKE use your google account

And run next commands:

    1. gcloud auth login      -- to autentificate to your google account
    2. gcloud container clusters create {NAME_OF_CLUSTER} --num-nodes {NUMBER_OF_NODES} --machine-type e2-medium
    3. gcloud container clusters get-credentials  {NAME_OF_CLUSTER}
    4. kubectl apply -f Deployment.yaml
    5. kubectl apply -f Service.yaml

After applying configuration can be got an external IP of load balancer in GCP. And deployed app can be access by this IP address.