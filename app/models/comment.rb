class Comment < ApplicationRecord
    validates :body, :creator_id, :workout_id, :creator, presence:true

    belongs_to :user,
    foreign_key: :creator_id,
    class_name: :User

    belongs_to :workout,
    foreign_key: :workout_id,
    class_name: :Workout

end
