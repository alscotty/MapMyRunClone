Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults:{format: :json} do
    resources :users, only:[:create, :index] do
      resource :follow, only:[:create, :destroy]
    end

    resource :session, only:[:create,:destroy]

    resources :workouts 
    resources :comments, only: [:create, :destroy, :show, :index]

    resources :likes, only: [:create, :destroy, :show, :index]

    resources :routes, only:[:create,:destroy, :index, :show] do
    resources :coordinates, only:[:create]
    end
    resources :coordinates, only:[:destroy]
  end

  root 'static_pages#root'
end
