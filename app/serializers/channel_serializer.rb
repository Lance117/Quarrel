class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :channel_name
  has_many :messages
end
