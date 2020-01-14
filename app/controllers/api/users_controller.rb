class Api::UsersController < ApplicationController
    def index
        @users = User.all
        if params[:channel_id]
            @users = Channel.find(params[:channel_id]).users
        end
        @users
    end

    def create
        @user = User.new(user_params)
        if valid_username(@user.username) && @user.save
            sign_in(@user)
            render json: @user
        else
            errors = @user.errors.full_messages
            if !valid_username(@user.username)
                errors.append("Username can't contain periods, or most punctuation.")
                errors.append("Username must be between 4 to 25 characters long.")
            end
            render json: errors, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:password, :username, :email)
    end
end
