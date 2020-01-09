class Api::RoutesController < ApplicationController

def new
end

def create
    @route=Route.new(route_params)
    if @route.save
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

#double check later on
def destroy
    @report.destroy
end




private
def route_params
    params.require(:route).permit(:title)
end


end