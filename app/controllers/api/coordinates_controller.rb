class Api::CoordinatesController < ApplicationController

def new
end

def show
    @coordinate=Coordinate.find(params[:id])
end

def create
    @coordinate=Coordinate.new(coordinate_params)
    if @coordinate.save
        render '/api/coordinate/show'
    else
        render json: @coordinate.errors.full_messages, status:422
    end
end

def destroy
end

private
def coordinate_params
    params.require(:coordinate).permit(:route_id,:lat,:lng,:ord)
end


end