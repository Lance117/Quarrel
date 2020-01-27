Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to:'static_pages#root'
  mount ActionCable.server, at: '/cable'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :create]
    resources :channels, only: [:index, :create, :update]
    resource :session, only: [:create, :destroy]
    # resources :channels do
    #   resources :messages
    # end
    # resources :users do
    #   resources :channels
    # end
    # resources :channels do
    #   resources :users
    # end
    resources :messages
    resources :memberships, only: [:index, :create, :destroy]
  end
end
