class Project < ActiveRecord::Base
  belongs_to :owner, :class_name => 'User'
  has_many :milestones,:order=>'created_at DESC'
  belongs_to :owner,:class_name => 'User'
end
