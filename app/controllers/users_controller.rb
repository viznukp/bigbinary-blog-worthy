# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    user = User.new(user_params.except(:organization_name))
    organization = Organization.find_or_initialize_by(name: parameterized_organization_name)
    user.organization = organization
    user.save!
    render_notice(t("successfully_created", entity: "User"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :organization_name)
    end

    def parameterized_organization_name
      user_params[:organization_name].parameterize
    end
end
