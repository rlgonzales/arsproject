class ProjectsController < ApplicationController
  
  before_filter :authenticate

  make_resourceful do
    actions :all
    after :create do
      # LoGG!
      u  = Update.new
      u.cache = "Added new project '<a href=\""+ project_path( current_object ) + "\">"+ current_object.name+"</a>'"
      u.owner_id = current_user.id
      u.save
    end
    before :create do
      current_object.owner_id = current_user.id
    end
  end
  
end