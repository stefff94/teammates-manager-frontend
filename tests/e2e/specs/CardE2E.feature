Feature: Card E2E Tests

  I want to make sure that the Card component is working properly

  Scenario: Visiting the app root page, I should see the teammates list
    Given I visit the app root page
    Then I see it contains the teammates list

  Scenario: Clicking the teammate's delete button, I should see the teammate disappear
    Given I click the teammate's delete button
    Then I see it disappear
