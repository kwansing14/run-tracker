class FixColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :run_logs, :speed, :time
  end
end