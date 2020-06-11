require 'test_helper'

class RunLogsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @run_log = run_logs(:one)
  end

  test "should get index" do
    get run_logs_url
    assert_response :success
  end

  test "should get new" do
    get new_run_log_url
    assert_response :success
  end

  test "should create run_log" do
    assert_difference('RunLog.count') do
      post run_logs_url, params: { run_log: { distance: @run_log.distance, speed: @run_log.speed, user_id: @run_log.user_id } }
    end

    assert_redirected_to run_log_url(RunLog.last)
  end

  test "should show run_log" do
    get run_log_url(@run_log)
    assert_response :success
  end

  test "should get edit" do
    get edit_run_log_url(@run_log)
    assert_response :success
  end

  test "should update run_log" do
    patch run_log_url(@run_log), params: { run_log: { distance: @run_log.distance, speed: @run_log.speed, user_id: @run_log.user_id } }
    assert_redirected_to run_log_url(@run_log)
  end

  test "should destroy run_log" do
    assert_difference('RunLog.count', -1) do
      delete run_log_url(@run_log)
    end

    assert_redirected_to run_logs_url
  end
end
