class Fixcolumnname2 < ActiveRecord::Migration[6.0]
  def change
    rename_column :pacings, :run_logs_id, :run_log_id
  end
end