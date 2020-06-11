require "application_system_test_case"

class RunLogsTest < ApplicationSystemTestCase
  setup do
    @run_log = run_logs(:one)
  end

  test "visiting the index" do
    visit run_logs_url
    assert_selector "h1", text: "Run Logs"
  end

  test "creating a Run log" do
    visit run_logs_url
    click_on "New Run Log"

    fill_in "Distance", with: @run_log.distance
    fill_in "Speed", with: @run_log.speed
    fill_in "User", with: @run_log.user_id
    click_on "Create Run log"

    assert_text "Run log was successfully created"
    click_on "Back"
  end

  test "updating a Run log" do
    visit run_logs_url
    click_on "Edit", match: :first

    fill_in "Distance", with: @run_log.distance
    fill_in "Speed", with: @run_log.speed
    fill_in "User", with: @run_log.user_id
    click_on "Update Run log"

    assert_text "Run log was successfully updated"
    click_on "Back"
  end

  test "destroying a Run log" do
    visit run_logs_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Run log was successfully destroyed"
  end
end
