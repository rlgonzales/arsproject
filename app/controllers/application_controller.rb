# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  helper_method :current_user,:current_user_session,:is_admin?

  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  layout :dynamic_layout
  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
  #
  private

  def is_admin?
    if current_user
      current_user.isadmin ? true : false
    end
    false
  end
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end
  
  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end

  
  def dynamic_layout
    "arsproject"
  end

  def authenticate
    if !current_user
      redirect_to login_url
    end
  end

end
