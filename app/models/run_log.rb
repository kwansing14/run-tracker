class RunLog < ApplicationRecord
  belongs_to :user
  has_many :pacings, dependent: :destroy
end