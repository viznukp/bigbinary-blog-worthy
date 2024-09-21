# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :description,
    :slug

  json.author do
    json.extract! post.user,
      :id,
      :name
  end
end
