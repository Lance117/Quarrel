class Api::MessagesController < ApplicationController
    # before_action :require_signed_in

    def index
        @messages = Message.all
    end

    def create
       message = current_user.messages.new(message_params) 
       if message.save
        ActionCable.server.broadcast(
            body: message.body,
            username: message.user.username
        )
       end
    end

    private

    def message_params
        params.require(:message).permit(:body, :user_id, :channel_id)
    end
end
