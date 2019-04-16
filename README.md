# Angular unit testing with Jest

Find out why unit tests are useful in a software development life cycle. Follow the best practices to ensure their reliability and effectiveness. Take into account the F.I.R.S.T. principles of unit testing, and apply them on testing Angular components/directives/pipes/services. Watch in a hands-on demo, which are the benefits of the Jest framework.

# angular-jest-demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run the following commands to run the unit tests via [Jest](https://jestjs.io).
### Single run
`npm run test` 

### Watch mode
`npm run test:watch`

### Coverage reports
Coverage reports are generated under the coverage folder. See the coverage overview in:

`coverage/lcov-report/index.html`

### Unit test html reports
Unit tests outcome is found in:

`jest_html_reporters.html`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Replace karma with jest
Run 
```
ng add @briebug/jest-schematics
```

or follow the instructions at:

https://blog.angularindepth.com/integrate-jest-into-an-angular-application-and-library-163b01d977ce