class Api::FollowsController < ApplicationController
    before_action :require_logged_in

    def create
        @follow= current_user.out_follows.create!(followee_id: params[:user_id])

        respond_to do |format|
            format.json {render json: @follow}
        end
    end

    def destroy
        @follow = current_user.out_follows.find_by(followee_id: params[:user_id])
        @follow.destroy!

    respond_to do |format|
      format.json { render json: @follow }
    end
    end

end