import { Given } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";

Given(`I visit the app root page`, () => {
    cy.visit("/");
});

Then(`I see it contains the welcome message`, () => {
    cy.contains("h1", "Welcome to Your Vue.js App");
});
