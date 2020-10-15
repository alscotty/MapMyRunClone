class Workout < ApplicationRecord
    validates :user_id, :title, :time, :miles, presence:true
    validates :time, :numericality => { greater_than: 0, message: " must be a positive number" }

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
   
   
    belongs_to :route,
    foreign_key: :route_id,
    class_name: :Route,
    optional: true

    has_many :comments,
    foreign_key: :workout_id,
    class_name: :Comment,
    dependent: :destroy
    
    has_many :likes,
    foreign_key: :workout_id,
    class_name: :Like,
    dependent: :destroy
    

    

end
