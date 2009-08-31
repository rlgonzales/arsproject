class UsersController < ApplicationController
  
  before_filter :authenticate, :except => [:new,:create]
  
  def new
    @user = User.new
  end
  
  def create
    logger.warn params.to_yaml
    @user = User.new(params[:user])
    if @user.save
      flash[:notice] = "Successfully registered."
      redirect_to root_url
    else
      render :action => 'new'
    end
  end
  
  def show

    if params[:id] == 'current'
      @user = current_user
    else
      @user = User.find(params[:id])
    end

  end

  def edit
    @user = User.find(params[:id])
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      flash[:notice] = "Successfully updated your profile."
      redirect_to root_url
    else
      render :action => 'edit'
    end
  end

end
