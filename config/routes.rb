Rails.application.routes.draw do
  resources :pacings
  root 'run_logs#index'
  resources :run_logs
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end