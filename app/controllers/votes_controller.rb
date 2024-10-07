# frozen_string_literal: true

class VotesController < ApplicationController
  before_action :load_post!, only: :create

  def create
    vote = Vote.find_or_initialize_by(post: @post, user: current_user)
    vote.vote_type = vote_params[:vote_type]
    vote.save!
  end

  private

    def load_post!
      @post = Post.find_by!(slug: vote_params[:slug])
    end

    def vote_params
      params.require(:vote).permit(:vote_type, :slug)
    end
end
