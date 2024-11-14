# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  has_many :post_categories
  has_many :posts, through: :post_categories

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }
end
