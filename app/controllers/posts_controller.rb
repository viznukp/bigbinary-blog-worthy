# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:user)
    formatted_posts = posts.map do |post|
      post.attributes.merge(
        {
          author: {
            id: post.user.id,
            name: post.user.name
          }
        }
      )
    end
    render status: :ok, json: { posts: formatted_posts }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render status: :ok, json: { notice: "Post created successfully" }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
