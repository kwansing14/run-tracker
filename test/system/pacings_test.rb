require "application_system_test_case"

class PacingsTest < ApplicationSystemTestCase
  setup do
    @pacing = pacings(:one)
  end

  test "visiting the index" do
    visit pacings_url
    assert_selector "h1", text: "Pacings"
  end

  test "creating a Pacing" do
    visit pacings_url
    click_on "New Pacing"

    fill_in "Body", with: @pacing.body
    fill_in "Run logs", with: @pacing.run_logs_id
    fill_in "User", with: @pacing.user_id
    click_on "Create Pacing"

    assert_text "Pacing was successfully created"
    click_on "Back"
  end

  test "updating a Pacing" do
    visit pacings_url
    click_on "Edit", match: :first

    fill_in "Body", with: @pacing.body
    fill_in "Run logs", with: @pacing.run_logs_id
    fill_in "User", with: @pacing.user_id
    click_on "Update Pacing"

    assert_text "Pacing was successfully updated"
    click_on "Back"
  end

  test "destroying a Pacing" do
    visit pacings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Pacing was successfully destroyed"
  end
end
