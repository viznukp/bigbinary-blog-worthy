# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post, only: %i[show update]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @posts = policy_scope(Post)
    @user_votes = current_user
      .votes.where(post: @posts)
      .index_by(&:post_id)
      .transform_values(&:vote_type)
  end

  def create
    post = Post.new(post_params)
    authorize post
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    authorize @post
  end

  def update
    authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post"))
  end

  private

    def post_params
      params.require(:post)
        .permit(:title, :description)
        .merge(author: current_user)
    end

    def load_post
      @post = Post.includes(:author).find_by!(slug: params[:slug])
    end
end
