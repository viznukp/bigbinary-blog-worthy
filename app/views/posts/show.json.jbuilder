json.post do
  json.extract! @post,
    :id,
    :title,
    :description,
    :is_blog_worthy,
    :updated_at

  json.author do
    json.extract! @post.author,
      :id,
      :name
  end
end
