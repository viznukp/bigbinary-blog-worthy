# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :slug,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_blog_worthy

  json.author do
    json.extract! post.author,
      :name
  end
end
