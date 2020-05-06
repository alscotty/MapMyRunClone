@likes.each do |like|
json.set! like.id do
    json.extract! like, :id, :user_id, :workout_id, :creator_name
end
end