@workouts.each do |workout|
    json.set! workout.id do
        json.extract! workout, :id, :title, :user_id, :route_id, :time, :miles,:description, :route, :updated_at
    end
end