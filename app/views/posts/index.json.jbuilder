json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :description,
    :upvotes,
    :downvotes

  json.author do
    json.extract! @current_user,
      :id,
      :name
  end
end
