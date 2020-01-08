class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.string :title, null:false
      t.integer :user_id, null:false
      t.integer :time
      t.integer :miles
      t.string :coordinates, null:false
      t.datetime :created_at, null:false
      t.datetime :updated_at, null:false

      t.timestamps
    end
    add_index :routes, :user_id
    add_index :routes, :coordinates

  end
end
