class Api::ChannelsController < ApplicationController
    before_action :require_signed_in, only: [:create]

    def create
    end
end
