class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :user_id, null:false
      t.string :creator_name, null:false
      t.integer :workout_id, null:false

      t.timestamps
    end
    add_index :likes, :user_id
    add_index :likes, :workout_id

  end
end
