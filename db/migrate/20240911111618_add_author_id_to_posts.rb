# frozen_string_literal: true

class AddAuthorIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :user_id, :integer
  end
end
