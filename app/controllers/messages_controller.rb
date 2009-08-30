class MessagesController < ApplicationController

  before_filter :authorize

  make_resourceful do
    actions :all
  end
end