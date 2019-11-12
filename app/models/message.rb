class Message < ApplicationRecord
    belongs_to :user
    belongs_to :channel
    validates :body, presence: true
    scope :for_display, -> { order(:created_at).last(42) }
end