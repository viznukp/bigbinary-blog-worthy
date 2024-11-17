# frozen_string_literal: true

FactoryBot.define do
  factory :vote do
    vote_type { %i[upvote downvote].sample }
    post
    user
  end
end
