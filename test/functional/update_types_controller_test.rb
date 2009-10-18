require 'test_helper'

class UpdateTypesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:update_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create update_type" do
    assert_difference('UpdateType.count') do
      post :create, :update_type => { }
    end

    assert_redirected_to update_type_path(assigns(:update_type))
  end

  test "should show update_type" do
    get :show, :id => update_types(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => update_types(:one).to_param
    assert_response :success
  end

  test "should update update_type" do
    put :update, :id => update_types(:one).to_param, :update_type => { }
    assert_redirected_to update_type_path(assigns(:update_type))
  end

  test "should destroy update_type" do
    assert_difference('UpdateType.count', -1) do
      delete :destroy, :id => update_types(:one).to_param
    end

    assert_redirected_to update_types_path
  end
end
