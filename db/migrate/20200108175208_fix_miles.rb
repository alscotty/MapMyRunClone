class FixMiles < ActiveRecord::Migration[5.2]
  def change
    remove_column :routes, :miles
    add_column :routes, :miles, :float
  end
end
