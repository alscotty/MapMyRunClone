class Coordinate < ApplicationRecord
<<<<<<< HEAD
=======
    validates :route_id, :lat, :lng, :ord, presence:true

    belongs_to :route,
    foreign_key: :route_id,
    class_name: :Route

>>>>>>> Routes_directions_snap
end
