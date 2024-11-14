# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post, only: %i[show update]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @posts = policy_scope(
      filter_by_categories_if_categories_is_present()
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

  private

    def filter_by_categories_if_categories_is_present()
      categories = filter_params[:categories]
      categories.present? ?
        Post.includes(:categories).where(categories: { name: categories }) :
        Post.includes(:categories)
    end

    def post_params
      params.require(:post)
        .permit(:title, :description, category_ids: [])
        .merge(author: current_user)
    end

    def filter_params
      params.fetch(:filters, {}).permit(categories: [])
    end

    def load_post
      @post = Post.includes(:author, :categories).find_by!(slug: params[:slug])
    end
end
