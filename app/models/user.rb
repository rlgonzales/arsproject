class User < ActiveRecord::Base
  acts_as_authentic
  is_gravtastic!

  def full_name
    return first_name.to_s + " " + last_name.to_s
  end
end
