# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post, only: %i[show update destroy]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @posts = policy_scope(
      filter_posts
    )

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

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def filter_posts
      posts = Post.all

      if filter_params[:categories].present?
        posts = posts.joins(:categories).where(categories: { name: filter_params[:categories] })
      end

      if filter_params[:user] == "current"
        posts = posts.where(author: current_user)
      end

      posts = posts.includes(:categories)
    end

    def post_params
      params.require(:post)
        .permit(:title, :description, :status, category_ids: [])
        .merge(author: current_user)
    end

    def filter_params
      params.fetch(:filters, {}).permit(:user, categories: [])
    end

    def load_post
      @post = Post.includes(:author, :categories).find_by!(slug: params[:slug])
    end
end
