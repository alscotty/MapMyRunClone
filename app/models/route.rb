class Route < ApplicationRecord
    validates :title,:user_id, presence:true

    has_many :coordinates,
    foreign_key: :route_id,
    class_name: :Coordinate,
    dependent: :destroy

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    has_many :workouts,
    foreign_key: :route_id,
    class_name: :Workout

end
