class RunLogsController < ApplicationController
  before_action :set_run_log, only: [:show, :edit, :update, :destroy]

  # GET /run_logs
  # GET /run_logs.json
  def index
    @run_logs = RunLog.all
  end

  # GET /run_logs/1
  # GET /run_logs/1.json
  def show
  end

  # GET /run_logs/new
  def new
    @run_log = RunLog.new

  end

  # GET /run_logs/1/edit
  def edit
  end

  # POST /run_logs
  # POST /run_logs.json
  def create
    @run_log = RunLog.new(run_log_params)

    respond_to do |format|
      if @run_log.save
        format.html { redirect_to @run_log, notice: 'Run log was successfully created.' }
        format.json { render :show, status: :created, location: @run_log }
      else
        format.html { render :new }
        format.json { render json: @run_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /run_logs/1
  # PATCH/PUT /run_logs/1.json
  def update
    respond_to do |format|
      if @run_log.update(run_log_params)
        format.html { redirect_to @run_log, notice: 'Run log was successfully updated.' }
        format.json { render :show, status: :ok, location: @run_log }
      else
        format.html { render :edit }
        format.json { render json: @run_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /run_logs/1
  # DELETE /run_logs/1.json
  def destroy
    @run_log.destroy
    respond_to do |format|
      format.html { redirect_to run_logs_url, notice: 'Run log was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_run_log
      @run_log = RunLog.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def run_log_params
      params.require(:run_log).permit(:distance, :speed, :user_id)
    end
end