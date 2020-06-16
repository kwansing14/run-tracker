class PacingsController < ApplicationController
  before_action :set_pacing, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  # GET /pacings
  # GET /pacings.json
  def index
    @pacings = Pacing.where(run_log_id: (params[:run_log_id]),user_id: current_user.id)
  end

  # GET /pacings/1
  # GET /pacings/1.json
  def show
  end

  # GET /pacings/new
  def new
    @pacing = Pacing.new

  end

  # GET /pacings/1/edit
  def edit
  end

  # POST /pacings
  # POST /pacings.json
  def create
    @pacing = Pacing.new(pacing_params)
    @pacing.user = current_user

    respond_to do |format|
      if @pacing.save
        format.html { redirect_to @pacing, notice: 'Pacing was successfully created.' }
        format.json { render :show, status: :created, location: @pacing }
        return
      else
        byebug
        format.html { render :new }
        format.json { render json: @pacing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pacings/1
  # PATCH/PUT /pacings/1.json
  def update
    respond_to do |format|
      if @pacing.update(pacing_params)
        format.html { redirect_to @pacing, notice: 'Pacing was successfully updated.' }
        format.json { render :show, status: :ok, location: @pacing }
        return
      else
        format.html { render :edit }
        format.json { render json: @pacing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pacings/1
  # DELETE /pacings/1.json
  def destroy
    @pacing.destroy
    respond_to do |format|
      format.html { redirect_to pacings_url, notice: 'Pacing was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pacing
      @pacing = Pacing.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pacing_params
      params.require(:pacing).permit(:body, :run_log_id)
    end
end