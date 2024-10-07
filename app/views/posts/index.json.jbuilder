# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :slug,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_blog_worthy

  json.vote_type @user_votes[post.id] || nil

  json.author do
    json.extract! post.author,
      :name
  end
end
