# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @post = build(:post)
  end

  def test_title_should_not_be_empty
    @post.title = ""
    assert @post.invalid?

    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_title_should_be_of_valid_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert @post.invalid?
  end

  def test_net_votes_should_not_be_negative
    @post.upvotes = 5
    @post.downvotes = 6
    assert @post.invalid?
  end

  def test_post_should_be_invalid_without_user
    @post.user = nil
    assert @post.invalid?
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_slug_should_be_unique
    @post.save!

    new_post_with_existing_title = build(:post)
    new_post_with_existing_title.title = @post.title
    assert new_post_with_existing_title.save!, "Slug is already taken"
  end

  def test_slug_should_not_be_changed_after_creation
    @post.save!
    @post.slug = "new-slug"
    assert @post.invalid?
    assert_includes @post.errors.full_messages, "Slug is immutable!"
  end
end
