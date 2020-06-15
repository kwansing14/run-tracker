require 'test_helper'

class PacingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pacing = pacings(:one)
  end

  test "should get index" do
    get pacings_url
    assert_response :success
  end

  test "should get new" do
    get new_pacing_url
    assert_response :success
  end

  test "should create pacing" do
    assert_difference('Pacing.count') do
      post pacings_url, params: { pacing: { body: @pacing.body, run_logs_id: @pacing.run_logs_id, user_id: @pacing.user_id } }
    end

    assert_redirected_to pacing_url(Pacing.last)
  end

  test "should show pacing" do
    get pacing_url(@pacing)
    assert_response :success
  end

  test "should get edit" do
    get edit_pacing_url(@pacing)
    assert_response :success
  end

  test "should update pacing" do
    patch pacing_url(@pacing), params: { pacing: { body: @pacing.body, run_logs_id: @pacing.run_logs_id, user_id: @pacing.user_id } }
    assert_redirected_to pacing_url(@pacing)
  end

  test "should destroy pacing" do
    assert_difference('Pacing.count', -1) do
      delete pacing_url(@pacing)
    end

    assert_redirected_to pacings_url
  end
end
