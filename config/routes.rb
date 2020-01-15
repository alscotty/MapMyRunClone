Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults:{format: :json} do
    resources :users, only:[:create]
    resource :session, only:[:create,:destroy]
<<<<<<< HEAD
=======
    resources :routes, only:[:create,:destroy, :index, :show] do
    resources :coordinates, only:[:create]
    end
    resources :coordinates, only:[:destroy]
>>>>>>> Routes_directions_snap
  end

  root 'static_pages#root'
end
