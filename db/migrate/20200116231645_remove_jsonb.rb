class RemoveJsonb < ActiveRecord::Migration[5.2]
  def change
    remove_column :routes, :coords
  end
end
