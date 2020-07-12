Feature: Form E2E Tests

  I want to test that the PersonalDataForm and TagMultiselect components are working properly

  Scenario: Visiting the app root page, I should see an empty PersonalDataForm and an empty TagMultiselect
    Given I visit the app root page
    Then I see PersonalDataForm's fields are empty
    And I see TagMultiselect is empty

  Scenario: Filling the form and pressing Reset, I should see an empty PersonalDataForm and TagMultiselect
    Given I visit the app root page
    And I fill "name" with "Paolo"
    And I fill "email" with "paolo.innocenti@stud.unifi.it"
    And I select "M" for "gender-dropdown"
    And I fill "city" with "Florence"
    And I select "Student" for "role-dropdown"
    And I fill "multiselect" with "Skill"
    When I click on "Reset"
    Then there shouldn't be any data in the fields

  Scenario: Filling the form and pressing Submit, I should see a new teammate with the data
    Given I visit the app root page
    And I fill "name" with "Paolo"
    And I fill "email" with "paolo.innocenti@stud.unifi.it"
    And I select "M" for "gender-dropdown"
    And I fill "city" with "Florence"
    And I select "Student" for "role-dropdown"
    And I fill "multiselect" with "Skill"
    When I click on "Submit"
    Then there should be a teammate card for the new teammate

  Scenario: Filling the form with a wrong mail and pressing Submit, I should see an error
    Given I visit the app root page
    And I fill "name" with "Paolo"
    And I fill "email" with "paolo innocenti"
    And I select "M" for "gender-dropdown"
    And I fill "city" with "Florence"
    And I select "Student" for "role-dropdown"
    And I fill "multiselect" with "Skill"
    When I click on "Submit"
    Then I should see "Please enter a correct value for field email"

  Scenario: Filling the form with a wrong name and pressing Submit, I should see an error
    Given I visit the app root page
    And I fill "name" with "Paolo1"
    And I fill "email" with "paolo.innocenti@stud.unifi.it"
    And I select "M" for "gender-dropdown"
    And I fill "city" with "Florence"
    And I select "Student" for "role-dropdown"
    And I fill "multiselect" with "Skill"
    When I click on "Submit"
    Then I should see "Please enter a correct value for field email"

  Scenario: Filling the form with a wrong mail and pressing Submit, I should see an error
    Given I visit the app root page
    And I fill "name" with "Paolo"
    And I fill "email" with "paolo.innocenti@stud.unifi.it"
    And I select "M" for "gender-dropdown"
    And I fill "city" with "Florence1"
    And I select "Student" for "role-dropdown"
    And I fill "multiselect" with "Skill"
    When I click on "Submit"
    Then I should see "Please enter a correct value for field email"

