class MessagesController < ApplicationController

  before_filter :authorize

  make_resourceful do
    action :all
  end
end