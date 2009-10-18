class UpdatesController < ApplicationController
  before_filter :authenticate

  make_resourceful do
    actions :all
  end
end
