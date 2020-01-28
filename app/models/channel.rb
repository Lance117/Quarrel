class Channel < ApplicationRecord
    belongs_to :user
    has_many :messages, dependent: :destroy
    has_many :memberships, dependent: :destroy
    # has_many :users, through: :memberships, dependent: :destroy
    validates :channel_name, presence: true, uniqueness: true

end