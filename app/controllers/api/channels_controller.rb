class Api::ChannelsController < ApplicationController

    def index
        @channels = Channel.all
        # if params[:user_id]
        #     @channels = User.find(params[:user_id]).channels
        # end
        # @channels
    end

    def show
        @channel = Channel.find(params[:id])
    end

    def update
        @channel = Channel.find(params[:id])
        if @channel.update(channel_params)
            render json: @channel
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            render json: @channel
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    private

    def channel_params
        params.require(:channel).permit(:channel_name, :topic)
    end
end
