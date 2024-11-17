# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @post = create(:post, author: @author)
    @author_headers = headers(@author)
    @category = create(:category)
  end

  def test_should_list_all_posts_of_current_user_and_published_posts_of_other_users_in_same_organization
    get posts_path, headers: @author_headers
    assert_response :success
    response_json = response.parsed_body
    response_posts = response_json["posts"]

    current_user_posts = Post.where(author_id: @author.id)

    published_posts_by_other_users_in_same_organization = Post.joins(:author)
      .where(author: { organization_id: @author.organization_id })
      .where(status: "published")
      .where.not(author_id: @author.id)

    expected_posts = current_user_posts + published_posts_by_other_users_in_same_organization

    assert_equal expected_posts.pluck(:id).sort, response_posts.pluck("id").sort
  end

  def test_should_create_valid_post
    post posts_path,
      params: {
        post: {
          title: "Learn Ruby", description: "This is a sample description", category_ids: [@category.id],
          status: "published"
        }
      },
      headers: @author_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Post"), response_json["notice"]
  end

  def test_shouldnt_create_post_without_title
    post posts_path,
      params: {
        post: {
          title: "", description: "This is a sample description", category_ids: [@category.id],
          status: "published"
        }
      },
      headers: @author_headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Title can't be blank, Title is invalid", response_json["error"]
  end

  def test_author_can_update_any_post
    new_title = "#{@post.title}-(updated)"
    post_params = { post: { title: new_title } }

    put post_path(@post.slug), params: post_params, headers: @author_headers
    assert_response :success
    @post.reload
    assert_equal new_title, @post.title
    assert_equal @author.id, @post.author_id
  end

  def test_should_destroy_post
    assert_difference "Post.count", -1 do
      delete post_path(@post.slug), headers: @author_headers
    end

    assert_response :ok
  end

  def test_user_should_not_be_able_to_delete_other_users_post
    other_user = create(:user)
    other_user_headers = headers(other_user)

    delete post_path(@post.slug), headers: other_user_headers
    assert_response :forbidden
    response_json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), response_json["error"]
  end

  def test_not_found_error_rendered_for_invalid_task_slug
    invalid_slug = "invalid-slug"

    get post_path(invalid_slug), headers: @author_headers
    assert_response :not_found
    assert_equal I18n.t("not_found", entity: "Post"), response.parsed_body["error"]
  end
end
