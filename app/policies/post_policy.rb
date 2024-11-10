# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def create?
    true
  end

  def show?
    post.author.organization_id == user.organization_id
  end

  def update?
    post.author_id == user.id
  end

  def destroy?
    post.author_id == user.id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.includes(:author).where(usersInSameOrganizationAsCurrentUser)
    end

    private

      def usersInSameOrganizationAsCurrentUser
        { users: { organization_id: user.organization_id } }
      end
  end
end
