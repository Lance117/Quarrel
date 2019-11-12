class Channel < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :memberships
    has_many :users, through: :memberships, dependent: :destroy
    validates :channel_name, presence: true

end