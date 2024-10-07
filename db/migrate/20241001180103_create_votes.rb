# frozen_string_literal: true

class CreateVotes < ActiveRecord::Migration[7.0]
  def up
    create_table :votes do |t|
      t.string :vote_type
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :votes
    Post.update_all(upvotes: 0, downvotes: 0)
  end
end
