class Readd < ActiveRecord::Migration[5.2]
  def change
  add_column :routes, :coords, :jsonb
  end
end
