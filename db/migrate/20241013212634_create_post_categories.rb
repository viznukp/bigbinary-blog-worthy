# frozen_string_literal: true

class CreatePostCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :post_categories, id: false do |t|
      t.references :post, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.timestamps
    end

    add_index :post_categories, [:post_id, :category_id], unique: true
  end
end
