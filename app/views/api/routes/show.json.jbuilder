json.set! @route.id do
    json.extract! @route, :id, :time,:miles
end