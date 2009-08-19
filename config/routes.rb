ActionController::Routing::Routes.draw do |map|
  map.resources :user_sessions

  map.resources :users

  map.root :controller => :projects

  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
