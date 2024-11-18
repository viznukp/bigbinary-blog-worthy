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
    valid_titles = %w[title title_1 title! -title- _title_ /title 1]

    valid_titles.each do |title|
      @post.title = title
      assert(@post.valid?, "Title '#{title}' should be valid")
    end
  end

  def test_validation_should_reject_invalid_titles
    invalid_titles = ["", "   ", "#$%#%^$%", "\n", "/", "***", "__", "~", "..."]

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

  def test_values_of_created_at_and_updated_at
    post = build(:post, title: "This is a sample post")
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.updated_at, post.created_at

    post.update!(title: "This is a updated post")
    assert_not_equal post.updated_at, post.created_at
  end

  def test_post_count_increases_on_saving
    assert_difference ["Post.count"] do
      create(:post)
    end
  end

  def test_post_count_decreases_on_deleting
    post = create(:post)
    assert_difference ["Post.count"], -1 do
      post.destroy!
    end
  end

  def test_post_slug_is_parameterized_title
    title = @post.title
    @post.save!
    assert_equal title.parameterize, @post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_two_worded_titles
    first_post = create(:post, title: "test post")
    second_post = create(:post, title: "test post")

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_hyphenated_titles
    first_post = create(:post, title: "test-post")
    second_post = create(:post, title: "test-post")

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_slug_generation_for_posts_having_titles_one_being_prefix_of_the_other
    first_post = create(:post, title: "fishing")
    second_post = create(:post, title: "fish")

    assert_equal "fishing", first_post.slug
    assert_equal "fish", second_post.slug
  end

  def test_error_raised_for_duplicate_slug
    @post.save!

    another_post = create(:post, title: "another test post")

    assert_raises ActiveRecord::RecordInvalid do
      @post.update!(slug: another_post.slug)
    end

    error_msg = @post.errors_to_sentence
    assert_match I18n.t("post.slug.immutable"), error_msg
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-post"
    first_post = create(:post, title:)
    second_post = create(:post, title:)
    third_post = create(:post, title:)
    fourth_post = create(:post, title:)

    assert_equal "#{title.parameterize}-4", fourth_post.slug

    third_post.destroy

    expected_slug_suffix_for_new_post = fourth_post.slug.split("-").last.to_i + 1

    new_post = create(:post, title:)
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_post}", new_post.slug
  end

  def test_existing_slug_prefixed_in_new_post_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and apple"
    new_title = "buy milk"

    existing_post = create(:post, title: title_having_new_title_as_substring)
    assert_equal title_having_new_title_as_substring.parameterize, existing_post.slug

    new_post = create(:post, title: new_title)
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = "Go for grocery shopping and buy apples"
    new_title = "buy apples"

    existing_post = create(:post, title: title_having_new_title_as_ending_substring)
    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_post.slug

    new_post = create(:post, title: new_title)
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"

    existing_post = create(:post, title: title_with_numbered_substring)
    assert_equal title_with_numbered_substring.parameterize, existing_post.slug

    substring_of_existing_slug = "buy"
    new_post = create(:post, title: substring_of_existing_slug)
    assert_equal substring_of_existing_slug.parameterize, new_post.slug
  end

  def test_creates_multiple_posts_with_unique_slug
    posts = create_list(:post, 10)
    slugs = posts.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end

  def test_posts_created_by_user_are_deleted_when_author_is_deleted
    author = create(:user)
    create(:post, author:)

    assert_difference "Post.count", -1 do
      author.destroy
    end
  end
end
