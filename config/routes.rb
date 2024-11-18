# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug do
      collection do
        put :bulk_update
        delete :bulk_destroy
        resource :report, only: %i[create], module: :posts do
          get :download, on: :collection
        end
      end
    end
    resources :users, only: :create
    resources :votes, only: :create
    resources :categories, only: %i[index create]
    resource :session, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
