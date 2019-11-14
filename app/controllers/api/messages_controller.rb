class Api::MessagesController < ApplicationController
    # before_action :require_signed_in

    def index
        @messages = Message.all
    end

    def create
       @message = current_user.messages.new(message_params) 
       @message.user = current_user
       if @message.save
        ActionCable.server.broadcast 'channel_channel',
            body: @message.body,
            username: @message.user.username
        )
       end
    end

    private

    def message_params
        params.require(:message).permit(:body, :channel_id)
    end
end
