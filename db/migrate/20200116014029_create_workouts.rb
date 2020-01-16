class CreateWorkouts < ActiveRecord::Migration[5.2]
  def change
    create_table :workouts do |t|
      t.integer :user_id, null:false
      t.integer :route_id
      t.string :title, null:false
      t.string :description
      t.integer :time, null:false
      t.float :miles, null:false

      t.datetime :created_at, null:false
      t.datetime :updated_at, null:false

      t.timestamps
    end
    add_index :workouts, :user_id
    add_index :workouts, :route_id
  end
end
