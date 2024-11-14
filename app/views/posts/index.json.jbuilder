# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :slug,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_blog_worthy,
    :updated_at

  json.vote_type @user_votes[post.id] || nil

  json.author do
    json.extract! post.author,
      :name
  end

  json.categories post.categories.map(&:name)

  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
