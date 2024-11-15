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

  def bulk_update
    update_fields = bulk_update_params[:update_fields]
    Post.where(slug: bulk_update_params[:slugs]).find_in_batches do |posts|
      posts.each do |post|
        authorize post, :update?
        if post.status != update_fields[:status]
          post.update!(update_fields)
        end
      end
    end

    render_notice(t("successfully_updated", entity: "Posts"))
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  def bulk_destroy
    Post.where(slug: bulk_destroy_params[:slugs]).find_in_batches do |posts|
      posts.each do |post|
        authorize post, :destroy?
        post.destroy!
      end
    end

    render_notice(t("successfully_deleted", entity: "Posts"))
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

      if filter_params[:status].present?
        posts = posts.where(status: filter_params[:status])
      end

      if filter_params[:title].present?
        posts = posts.where("LOWER(title) LIKE ?", "%#{filter_params[:title].downcase}%")
      end

      posts = posts.includes(:categories)
    end

    def post_params
      params.require(:post)
        .permit(:title, :description, :status, category_ids: [])
        .merge(author: current_user)
    end

    def bulk_update_params
      params.require(:posts)
        .permit(update_fields: [:status], slugs: [])
    end

    def bulk_destroy_params
      params.require(:posts).permit(slugs: [])
    end

    def filter_params
      params.fetch(:filters, {}).permit(:user, :title, :status, categories: [])
    end

    def load_post
      @post = Post.includes(:author, :categories).find_by!(slug: params[:slug])
    end
end
