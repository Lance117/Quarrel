module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user ||= User.find_by_session_token(session[:session_token])
    end

    private

      def session
        key = Rails.application.config.session_options.fetch(:key)
        cookies.encrypted[key]&.symbolize_keys || {}
      end
  end
end
