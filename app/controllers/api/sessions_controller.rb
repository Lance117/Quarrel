class Api::SessionsController < ApplicationController
    def create
        user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
        )
        if user
            sign_in(user)
            render json: user
        else
            render json: 'Sorry, you entered an incorrect username or password.', status: 404
        end
    end

    def destroy
        if !signed_in?
            render json: {}, status: 422
        else
            sign_out
        end
    end
end
