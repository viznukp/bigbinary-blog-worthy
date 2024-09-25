# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Lorem.sentence(word_count: 3) }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
    upvotes { Faker::Number.between(from: 25, to: 30) }
    downvotes { Faker::Number.between(from: 0, to: 5) }
    is_blog_worthy { true }
    user
  end
end
