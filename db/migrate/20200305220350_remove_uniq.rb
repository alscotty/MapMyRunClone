class RemoveUniq < ActiveRecord::Migration[5.2]
  def change
    remove_index 'followers', name: 'index_follows_on_follower_id'

  end
end