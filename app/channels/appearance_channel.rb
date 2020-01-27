class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance_channel"
    if current_user
      current_user.online = true
      current_user.save!
      user_cable(current_user)
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    if current_user
      current_user.online = false
      current_user.save!
      user_cable(current_user)
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
