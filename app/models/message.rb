class Message < ApplicationRecord
    belongs_to :user
    belongs_to :channel
    validates :body, presence: true
end