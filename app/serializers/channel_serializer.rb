class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :channel_name, :topic, :created_at, :user_id
end
