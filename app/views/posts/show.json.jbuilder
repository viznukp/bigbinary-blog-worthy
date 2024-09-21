json.post do
  json.extract! @post,
    :id,
    :title,
    :description

  json.author do
    json.extract! @post.user,
      :id,
      :name
  end
end
