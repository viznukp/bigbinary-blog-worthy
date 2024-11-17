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

  def test_decrtiption_should_not_be_empty
    @post.description = ""
    assert @post.invalid?

    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  def test_title_should_be_of_valid_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert @post.invalid?
  end

  def test_description_should_be_of_valid_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert @post.invalid?
  end

  def test_validation_should_accept_valid_titles
    valid_titles = ["ABCD", "abcd", "abcd123", "a", "1234", "123abc", "abc!#@$", "!@#Abc", "123!@$",
                    "abcd  123 !@$@#.."]

    valid_titles.each do |title|
      @post.title = title
      assert(@post.valid?, "Title '#{title}' should be valid")
    end
  end

  def test_validation_should_reject_invalid_titles
    invalid_titles = ["", "   ", "#$%#%^$%", "\n"]

    invalid_titles.each do |title|
      @post.title = title
      assert(@post.invalid?, "Title '#{title}' should be invalid")
    end
  end

  def test_post_should_be_invalid_without_author
    @post.author = nil
    assert @post.invalid?
    assert_includes @post.errors.full_messages, "Author must exist"
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

  def test_post_should_not_be_saved_without_status
    @post.status = nil
    assert @post.invalid?

    assert_includes @post.errors.full_messages, "Status can't be blank"
  end

  def test_validation_should_reject_invalid_status
    @post.status = "Invalid status"
    assert @post.invalid?

    assert_includes @post.errors.full_messages, "Status is not included in the list"
  end

  def test_is_blog_worthy_should_be_calculated_correctly_based_on_threshold
    @post.upvotes = Constants::BLOG_WORTHY_THRESHOLD + 1
    @post.downvotes = 0
    @post.save!
    assert @post.is_blog_worthy, "Post should be blog worthy when upvotes minus downvotes is greater than the threshold"

    @post.upvotes = Constants::BLOG_WORTHY_THRESHOLD
    @post.downvotes = 0
    @post.save!
    assert_not @post.is_blog_worthy, "Post should not be blog worthy when upvotes minus downvotes is equal to the threshold"

    @post.upvotes = Constants::BLOG_WORTHY_THRESHOLD - 1
    @post.downvotes = 0
    @post.save!
    assert_not @post.is_blog_worthy, "Post should not be blog worthy when upvotes minus downvotes is less than the threshold"

    @post.upvotes = Constants::BLOG_WORTHY_THRESHOLD + 5
    @post.downvotes = 3
    @post.save!
    assert @post.is_blog_worthy, "Post should be blog worthy when the difference between upvotes and downvotes is greater than the threshold"

    @post.upvotes = Constants::BLOG_WORTHY_THRESHOLD
    @post.downvotes = Constants::BLOG_WORTHY_THRESHOLD
    @post.save!
    assert_not @post.is_blog_worthy, "Post should not be blog worthy when the difference between upvotes and downvotes equals the threshold"
  end
end
