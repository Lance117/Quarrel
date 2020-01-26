class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
        )
        if @user
            sign_in(@user)
            ActionCable.server.broadcast "appearance_channel", { user: current_user.id, online: :on }
            current_user.online = true
            current_user.save!
            render json: @user
        else
            render json: ['Sorry, you entered an incorrect email address or password.'], status: 401
        end
    end

    def destroy
        if !signed_in?
            render json: {}, status: 404
        else
            ActionCable.server.broadcast "appearance_channel", { user: current_user.id, online: :off }
            current_user.online = false
            current_user.save!
            sign_out
        end
    end
end
