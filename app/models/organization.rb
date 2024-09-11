# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 255

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
