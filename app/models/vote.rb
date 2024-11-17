# frozen_string_literal: true

class Vote < ApplicationRecord
  enum :vote_types, { upvote: "upvote", downvote: "downvote" }

  belongs_to :user
  belongs_to :post

  validates :vote_type, presence: true
  validates :user_id, uniqueness: { scope: :post_id }

  counter_culture :post, column_name: Proc.new {
    |model| model.vote_type == "upvote" ? "upvotes" : "downvotes"
  }

  after_save :update_post_blog_worthy_status

  private

    def update_post_blog_worthy_status
      post.reload
      post.save!
    end
end
