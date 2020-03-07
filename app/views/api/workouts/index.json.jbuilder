@workouts.each do |workout|
    json.set! workout.id do
        json.extract! workout, :creator, :id, :title, :user_id, :route_id, :time, :miles,:description, :route, :updated_at, :created_at, :comments
    end
end