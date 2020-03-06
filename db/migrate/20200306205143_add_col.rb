class AddCol < ActiveRecord::Migration[5.2]
  def change
    add_column :workouts, :creator, :string, null:false
  end
end
