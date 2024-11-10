class SeedStatusValueForExistingPosts < ActiveRecord::Migration[7.0]
  def up
    Post.find_each do |post|
      post.status = "Published"
      post.save!(validate: false)
    end
  end

  def down
    Post.find_each do |post|
      post.status = nil
      post.save!(validate: false)
    end
  end
end
