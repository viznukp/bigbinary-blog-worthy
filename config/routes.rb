# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug do
      collection do
        put :bulk_update
        delete :bulk_destroy
      end
    end
    resources :users, only: :create
    resources :organizations, only: :index
    resources :votes, only: :create
    resources :categories, only: %i[index create]
    resource :session, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
