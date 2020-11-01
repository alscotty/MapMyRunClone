class Api::WorkoutsController < ApplicationController

    def new
    end

    def create
        @workout=Workout.new(workout_params)
        if @workout.save
            render 'api/workouts/show'
        else
            render json: @workout.errors.full_messages, status:422
        end
    end

    def update
        @workout = current_user.workouts.find(params[:id])
        if @workout.update(workout_params)
            render 'api/workouts/show'
        else
            render json: @workout.errors.full_messages, status:422
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
        params.require(:workout).permit(:user_id, :route_id, :title, :description, :time, :miles, :creator)
    end


end
