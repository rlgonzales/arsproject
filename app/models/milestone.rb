class Milestone < ActiveRecord::Base
  belongs_to :project
  has_many :stories,:order => 'created_at DESC'
end
