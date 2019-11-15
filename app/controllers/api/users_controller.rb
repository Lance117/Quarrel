class Api::UsersController < ApplicationController
    def index
        if params[:channel_id]
            @users = Channel.find(params[:channel_id]).users
        else
            @users = User.all
        end
    end

    def create
        @user = User.new(user_params)
        if @user.save
            sign_in(@user)
            render json: @user
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:password, :username, :email)
    end
end
