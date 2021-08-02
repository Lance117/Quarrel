class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :channel_id, :created_at, :updated_at
end
