class CreateCoordinates < ActiveRecord::Migration[5.2]
  def change
    create_table :coordinates do |t|
      t.integer :route_id, null:false
      t.float :lat, null:false
      t.float :lng, null:false
      t.integer :ord, null:false

      t.timestamps
    end
    add_index :coordinates, :route_id
  end
end
