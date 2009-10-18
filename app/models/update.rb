class Update < ActiveRecord::Base
  belongs_to :owner, :class_name => 'User'
end
