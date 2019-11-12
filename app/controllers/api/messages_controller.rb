class Api::MessagesController < ApplicationController
    before_action :require_signed_in

    def create
        
    end

    private

    def message_params
        params.require(:message).permit(:body)
    end
end
