class Like < ApplicationRecord
    validates :user_id, :creator_name, :workout_id, presence:true

    validates :user_id, uniqueness: { scope: :workout_id }

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :workout,
    foreign_key: :workout_id,
    class_name: :Workout

end
