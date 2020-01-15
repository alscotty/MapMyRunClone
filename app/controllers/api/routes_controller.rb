class Api::RoutesController < ApplicationController

def new
end

def create
    @route=Route.new(route_params)
    if @route.save
        
        coordinate_params.each do |idx,coord|
            coord_obj={
                lat: coord[:lat],
                lng: coord[:lng],
                ord: idx,
                route_id:@route.id
            }

            @new_coord=Coordinate.new(coord_obj)
            if !@new_coord.save
                render @new_coord.errors.full_messages, status:422
            end
        end
        
        
        render 'api/routes/show'
    else
        render json: @route.errors.full_messages, status:422
    end
end

def show
    @route=Route.find(params[:id])
end

def index
    @routes=Route.all
end

def destroy
    @route=Route.find(params[:id])
    @route.destroy
    render json: @route
end

private
def route_params
    params.require(:route).permit(:title, :user_id, :miles)
end

def coordinate_params
    params.require(:coordinates)
end

end