class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :workout_id, null:false
      t.integer :creator_id, null:false
      t.string :creator, null:false
      t.text :body, null:false

      t.timestamps
    end
    add_index :comments, :workout_id, unique:true

  end
end
