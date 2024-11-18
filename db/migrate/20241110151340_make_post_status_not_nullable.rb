class MakePostStatusNotNullable < ActiveRecord::Migration[7.0]
  class MakeSlugNotNullable < ActiveRecord::Migration[7.0]
    def up
      change_column_null :posts, :status, false
    end

    def down
      change_column_null :posts, :status, true
    end
  end

end
