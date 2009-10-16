class MessagesController < ApplicationController

  before_filter :authenticate

  make_resourceful do
    actions :all
    before :create do
      current_object.from_id = current_user.id
    end
  end
end