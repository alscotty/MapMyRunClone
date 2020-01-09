@routes.each do |route|
json.set! route.id do
    json.extract! route, :id, :time, :miles
end
end