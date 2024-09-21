# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = Post.joins(user: :organization)
             .where(users: { organization_id: @current_user.organization_id })
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.includes(:user).find_by!(slug: params[:slug])
  end

  private

    def post_params
      params.require(:post)
        .permit(:title, :description)
        .merge(user_id: @current_user.id)
    end
end
