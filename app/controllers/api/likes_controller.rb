class Api::LikesController < ApplicationController

    def create
        @like = Like.new(like_params)
        if @like.save
            render json: @like
        else
            render @like.errors.full_messages, status:422
        end
    end

    def show
        @like = Like.find(params[:id])
    end

    def index
        @likes=Like.all
    end

    def destroy
        @like = Like.find(params[:id])
        @like.destroy
        render json: @like
    end

    private
    def like_params
        params.require(:like).permit(:user_id, :creator_name,:workout_id)
    end

end
