class Api::MessagesController < ApplicationController
    # before_action :require_signed_in

    def index
        @messages = Message.all
    end

    def show
        @message = Message.find(params[:id])
    end

    def create
        @message = current_user.messages.new(message_params) 
        @message.user = current_user
        if @message.save
            message_cable(@message)
            render json: @message
        else
            render json: @message.errors.full_messages, status: 422
       end
    end

    def update
        @message = Message.find(params[:id])
        if @message.update(message_params)
            message_cable(@message)
            render json: @message
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find(params[:id])
        @message.destroy
        render json: @message
    end

    private

    def message_params
        params.require(:message).permit(:body, :channel_id)
    end

    def message_cable(message)
        ActionCable.server.broadcast(
            "messages#{message.channel_id}",
            id: message.id,
            body: message.body,
            user_id: message.user_id,
            channel_id: message.channel_id,
            created_at: message.created_at
        )
    end
end
