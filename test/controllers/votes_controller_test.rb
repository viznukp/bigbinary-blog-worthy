# frozen_string_literal: true

require "test_helper"

class VotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @post = create(:post, author: @author)
    @creator_headers = headers(@author)
    @vote = create(:vote, post: @post, user: @author, vote_type: :upvote)
  end

  def test_should_create_valid_upvote
    post votes_path,
      params: {
        vote: {
          slug: @post.slug,
          vote_type: :upvote
        }
      },
      headers: @creator_headers

    assert_response :success
  end

  def test_should_create_valid_downvote
    post votes_path,
      params: {
        vote: {
          slug: @post.slug,
          vote_type: :downvote
        }
      },
      headers: @creator_headers

    assert_response :success
  end

  def test_shouldnt_create_vote_without_vote_type
    post votes_path,
      params: {
        vote: {
          slug: @post.slug
        }
      },
      headers: @creator_headers

    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Vote type can't be blank", response_json["error"]
  end

  def test_user_can_only_vote_once_per_post
    initial_vote_count = @post.votes.count

    post votes_path,
      params: {
        vote: {
          slug: @post.slug,
          vote_type: :upvote
        }
      },
      headers: @creator_headers

    assert_equal initial_vote_count, @post.votes.count
  end
end
