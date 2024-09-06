# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    render html: "This is from PostsController "
  end
end
