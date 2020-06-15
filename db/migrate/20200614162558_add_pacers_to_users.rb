class AddPacersToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :run_logs, :pace, :float
  end
end