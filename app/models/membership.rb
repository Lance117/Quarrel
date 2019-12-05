class Membership < ApplicationRecord
    belongs_to :user
    belongs_to :channel

    validates :user_id, presence: true
    validates :channel_id, presence: true
end
