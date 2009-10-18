class AddCacheToUpdate < ActiveRecord::Migration
  def self.up
    add_column :updates, :cache,:string
  end

  def self.down
    remove_column :updates, :cache
  end
end
