class MilestonesController < ApplicationController
  before_filter :authenticate

  
  make_resourceful do
    actions :all
    response_for :create do |f|
      f.json { render :json => {:resp => 'ok'}}
    end
  end

end