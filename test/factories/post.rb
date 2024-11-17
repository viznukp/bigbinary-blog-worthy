# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Lorem.sentence(word_count: 3) }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
    upvotes { Faker::Number.between(from: 0, to: 50) }
    downvotes { Faker::Number.between(from: 0, to: 50) }
    status { Post::VALID_STATUSES.sample }
    association :author, factory: :user

    is_blog_worthy do
      (upvotes.to_i - downvotes.to_i) > Constants::BLOG_WORTHY_THRESHOLD
    end
  end
end
