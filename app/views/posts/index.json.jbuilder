# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :slug,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_blog_worthy

  json.author do
    json.extract! post.user,
      :id,
      :name
  end
end
