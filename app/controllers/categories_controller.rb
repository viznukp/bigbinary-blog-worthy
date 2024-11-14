# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    category.save!
    render_notice(t("successfully_created", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
