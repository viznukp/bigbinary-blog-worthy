# frozen_string_literal: true

class MakeSlugNotNullable < ActiveRecord::Migration[7.0]
  def up
    change_column_null :posts, :slug, false
  end

  def down
    change_column_null :posts, :slug, true
  end
end
