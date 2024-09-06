# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH }
  validate :non_negative_net_votes
  validates_inclusion_of :is_blog_worthy, in: [true, false]

  private

    def non_negative_net_votes
      net_votes = upvotes - downvotes

      if net_votes.negative?
        errors.add(:base, "Net votes (upvotes - downvotes) cannot be negative")
      end
    end
end
