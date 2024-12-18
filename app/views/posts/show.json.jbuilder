json.post do
  json.extract! @post,
    :id,
    :title,
    :description,
    :is_blog_worthy,
    :status,
    :updated_at

  json.author do
    json.extract! @post.author,
      :id,
      :name
  end

  json.categories @post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
