class Api::MembershipsController < ApplicationController
    def index
        @memberships = Membership.all
    end

    def create
        @membership = Membership.new(membership_params)
        if @membership.save
            render json: @membership
        else
            render json: @membership.errors.full_messages, status: 422
        end
    end

    def membership_params
        params.require(:membership).permit(:user_id, :channel_id)
    end
end
