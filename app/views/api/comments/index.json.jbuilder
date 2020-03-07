@comments.each do |comment|
json.set! comment.id do
    json.extract! comment, :id, :creator_id, :workout_id, :body, :creator, :updated_at
end
end