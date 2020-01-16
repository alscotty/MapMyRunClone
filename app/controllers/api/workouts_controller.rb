class Api::WorkoutsController < ApplicationController

    def new
    end

    def create
        @workout=Workout.new(workout_params)
        if @workout.save
            render 'api/workouts/show'
        else
            render @workout.errors.full_messages, status:422
        end
    end


    def show
        @workout=Workout.find(params[:id])
    end

    def index
        @workouts=Workout.all
    end

    def destroy
        @workout=Workout.find(params[:id])
        @workout.destroy
        render json: @workout
    end
  
    private
    def workout_params
        params.require(:workout).permit(:user_id, :route_id, :title, :description, :time, :miles)
    end


end
