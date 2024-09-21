# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_policy_scoped, only: :index

  def index
    @posts = policy_scope(Post)
  end

  def create
    post = Post.new(post_params)
    authorize post
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
