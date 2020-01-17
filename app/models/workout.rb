class Workout < ApplicationRecord
    validates :user_id, :title, :time, :miles, presence:true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
   
   
    belongs_to :route,
    foreign_key: :route_id,
    class_name: :Route,
    optional: true

    

end
