class User < ActiveRecord::Base
  acts_as_authentic
  is_gravtastic!

  has_many :friendships,:foreign_key => :owner_id
  has_many :friends,:through => :friendships
  has_many :updates,:foreign_key => :owner_id,:limit => 20,:order => 'created_at DESC'

  def full_name
    f = first_name
    l = last_name
    return (f ? f.to_s : 'First Name')  + " " + (l ? l.to_s : 'Last Name')
  end
end
