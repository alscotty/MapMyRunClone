class Api::CommentsController < ApplicationController

    def create  
        @comment=Comment.new(comment_params)
            if @comment.save
                render json: @comment
            else
            render @comment.errors.full_messages, status:422

            end
    end

    def show
        @comment=Comment.find(params[:id])
    end

    def index
        @comments=Comment.all
    end

    def destroy
        @comment=Comment.find(params[:id])
        @comment.destroy
        render json: @comment
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :creator, :creator_id, :workout_id)
    end

end
