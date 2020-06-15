class CreatePacings < ActiveRecord::Migration[6.0]
  def change
    create_table :pacings do |t|
      t.float :body
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :run_logs, null: false, foreign_key: true

      t.timestamps
    end
  end
end
