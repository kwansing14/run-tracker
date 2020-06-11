class CreateRunLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :run_logs do |t|
      t.float :distance
      t.float :speed
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
