ActionController::Routing::Routes.draw do |map|
  map.resources :update_types
  map.resources :updates
  
  map.resources :user_sessions
  map.resources :projects
  map.resources :milestones
  map.resources :messages
  map.resources :stories

  map.resources :users

  map.login    'login',:controller=>'user_sessions',:action => 'new'
  map.logout   'logout',:controller=>'user_sessions',:action => 'destroy'
  map.register 'register',:controller=>'users',:action => 'new'

  map.root :controller => 'users',:action=>'show',:id=>'current'

  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
