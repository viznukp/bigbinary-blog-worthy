# frozen_string_literal: true

class CreateOrganization < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
