class Project < ActiveRecord::Base
  belongs_to :owner, :class_name => 'User'
  has_many :milestones
  belongs_to :owner,:class_name => 'User'
end
