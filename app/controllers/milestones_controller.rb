class MilestonesController < ApplicationController
  before_filter :authenticate

  def new_milestone
  end
  
  make_resourceful do
    actions :all
  end

end