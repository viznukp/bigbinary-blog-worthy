# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :slug,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_blog_worthy,
    :status,
    :updated_at

  json.vote_type @user_votes[post.id] || nil

  json.author do
    json.extract! post.author,
      :name
  end

  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
