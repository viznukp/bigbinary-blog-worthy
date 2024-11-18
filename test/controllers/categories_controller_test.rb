# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @creator_headers = headers(@user)
    @category = create(:category)
  end

  def test_should_create_valid_category
    post categories_path,
      params: {
        category: {
          name: "test category"
        }
      },
      headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Category"), response_json["notice"]
  end

  def test_should_list_all_categories
    get categories_path, headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    response_categories = response_json["categories"]

    all_categories = Category.all

    assert_equal all_categories.pluck(:id).sort, response_categories.map { |category| category["id"] }.sort
  end
end
