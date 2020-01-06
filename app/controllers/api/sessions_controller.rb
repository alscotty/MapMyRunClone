class Api::SessionsController < ApplicationController

def new
end

def create
        # Find user by credentials
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user.nil?
      render json: ['Nope. Wrong credentials!'], status: 401
    else
      login!(@user)
      render 'api/users/show';
    end
end

#not entirely sure about this
def destroy
  logout!
  render json:{message: 'logout successful'}
end


end

    # logout!
    # render json: { message: 'Logout successful.' }