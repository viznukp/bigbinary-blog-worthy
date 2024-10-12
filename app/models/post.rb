# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  belongs_to :author, foreign_key: "author_id", class_name: "User"
  has_many :votes, dependent: :destroy

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }
  validates :description,
    presence: true,
    length: { maximum: MAX_DESCRIPTION_LENGTH }
  validates_inclusion_of :is_blog_worthy, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  def update_blog_worthy_status
    net_votes = upvotes - downvotes
    self.is_blog_worthy = net_votes >= Constants::BLOG_WORTHY_THRESHOLD
    save!
  end

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug

      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end

      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, I18n.t("post.slug.immutable"))
      end
    end
end
