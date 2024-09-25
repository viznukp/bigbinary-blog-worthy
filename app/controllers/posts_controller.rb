# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post, only: :update

  after_action :verify_policy_scoped, only: :index
  after_action :update_blogworthy_status, only: :update

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

  def update
    @post.update!(post_params)
  end

  private

    def post_params
      permitted = [:title, :description]
      permitted << :upvotes << :downvotes if action_name == "update"

      params.require(:post)
        .permit(*permitted)
        .merge(user_id: @current_user.id)
    end

    def load_post
      @post = Post.find_by!(slug: params[:slug])
    end

    def update_blogworthy_status
      blog_worthy_status = @post.is_blog_worthy?
      @post.update!(is_blog_worthy: blog_worthy_status)
    end
end
