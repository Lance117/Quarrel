class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages#{params[:channelId]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
