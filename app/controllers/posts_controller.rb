# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render status: :ok, json: { notice: "Post created successfully" }
  end

  def show
    post = Post.find_by!(id: params[:id])
    render status: :ok, json: { post: }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
