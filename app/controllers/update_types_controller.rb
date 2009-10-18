class UpdateTypesController < ApplicationController
  # GET /update_types
  # GET /update_types.xml
  def index
    @update_types = UpdateType.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @update_types }
    end
  end

  # GET /update_types/1
  # GET /update_types/1.xml
  def show
    @update_type = UpdateType.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @update_type }
    end
  end

  # GET /update_types/new
  # GET /update_types/new.xml
  def new
    @update_type = UpdateType.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @update_type }
    end
  end

  # GET /update_types/1/edit
  def edit
    @update_type = UpdateType.find(params[:id])
  end

  # POST /update_types
  # POST /update_types.xml
  def create
    @update_type = UpdateType.new(params[:update_type])

    respond_to do |format|
      if @update_type.save
        flash[:notice] = 'UpdateType was successfully created.'
        format.html { redirect_to(@update_type) }
        format.xml  { render :xml => @update_type, :status => :created, :location => @update_type }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @update_type.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /update_types/1
  # PUT /update_types/1.xml
  def update
    @update_type = UpdateType.find(params[:id])

    respond_to do |format|
      if @update_type.update_attributes(params[:update_type])
        flash[:notice] = 'UpdateType was successfully updated.'
        format.html { redirect_to(@update_type) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @update_type.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /update_types/1
  # DELETE /update_types/1.xml
  def destroy
    @update_type = UpdateType.find(params[:id])
    @update_type.destroy

    respond_to do |format|
      format.html { redirect_to(update_types_url) }
      format.xml  { head :ok }
    end
  end
end
