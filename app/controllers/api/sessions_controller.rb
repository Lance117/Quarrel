class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
        )
        if @user
            sign_in(@user)
            current_user.online = true
            current_user.save!
            user_cable(@user)
            render json: @user
        else
            render json: ['Sorry, you entered an incorrect email address or password.'], status: 401
        end
    end

    def destroy
        if !signed_in?
            render json: {}, status: 404
        else
            current_user.online = false
            current_user.save!
            user_cable(current_user)
            sign_out
        end
    end

    private

    def user_cable(user)
       ActionCable.server.broadcast(
            "appearance_channel",
            id: user.id,
            online: user.online,
            username: user.username,
            email: user.email
        ) 
    end
end
