# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user)
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
