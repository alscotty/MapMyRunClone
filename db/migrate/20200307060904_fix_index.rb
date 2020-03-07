class FixIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :comments, name: "index_comments_on_workout_id"
  end
end
