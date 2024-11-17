require "test_helper"

class VoteTest < ActiveSupport::TestCase
  def setup
    @vote = build(:vote)
  end

  def test_vote_type_should_not_be_empty
    @vote.vote_type = nil
    assert @vote.invalid?
  end

  def test_values_of_created_at_and_updated_at
    vote = build(:vote)
    vote.vote_type = "upvote"
    assert_nil vote.created_at
    assert_nil vote.updated_at

    vote.save!
    assert_not_nil vote.created_at
    assert_equal vote.updated_at, vote.created_at

    vote.update!(vote_type: "downvote")
    assert_not_equal vote.updated_at, vote.created_at
  end

  def test_vote_count_increases_on_saving
    assert_difference ["Vote.count"] do
      create(:vote)
    end
  end

  def test_vote_count_decreases_on_deleting
    vote = create(:vote)
    assert_difference ["Vote.count"], -1 do
      vote.destroy!
    end
  end

  def test_multiple_votes_cannot_have_same_user_id_and_post_id
    user = create(:user)
    post = create(:post)

    create(:vote, user:, post:)
    second_vote = build(:vote, user:, post:)

    assert second_vote.invalid?
  end

  def test_votes_created_by_user_are_deleted_when_user_is_deleted
    user_who_voted = create(:user)
    create(:vote, user: user_who_voted)

    assert_difference "Vote.count", -1 do
      user_who_voted.destroy!
    end
  end

  def test_votes_of_post_are_deleted_when_post_is_deleted
    post = create(:post)
    create(:vote, post:)

    assert_difference "Vote.count", -1 do
      post.destroy!
    end
  end

  def test_votes_of_post_are_deleted_when_author_of_post_is_deleted
    author_of_post = create(:user)
    post = create(:post, author: author_of_post)
    create(:vote, post:, user: author_of_post)

    assert_difference "Vote.count", -1 do
      author_of_post.destroy!
    end
  end

  def test_upvote_count_incremented_on_post_when_new_upvote_is_created
    post = create(:post)

    assert_difference("post.upvotes", 1) do
      create(:vote, post:, vote_type: :upvote)
    end
  end

  def test_downvote_count_incremented_on_post_when_new_downvote_is_created
    post = create(:post)

    assert_difference("post.downvotes", 1) do
      create(:vote, post:, vote_type: :downvote)
    end
  end

  def test_blog_worthy_status_on_post_is_updated_when_new_upvote_is_created
    post = create(:post, upvotes: Constants::BLOG_WORTHY_THRESHOLD, downvotes: 0)

    assert_not post.is_blog_worthy

    create(:vote, post:, vote_type: :upvote)

    assert post.is_blog_worthy
  end

  def test_blog_worthy_status_on_post_is_updated_when_new_downvote_is_created
    post = create(:post, upvotes: Constants::BLOG_WORTHY_THRESHOLD + 1, downvotes: 0)

    assert post.is_blog_worthy

    create(:vote, post:, vote_type: :downvote)

    assert_not post.is_blog_worthy
  end
end
