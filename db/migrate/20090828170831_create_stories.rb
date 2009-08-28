class CreateStories < ActiveRecord::Migration
  def self.up
    create_table :stories do |t|
      t.string :name
      t.string :description
      t.integer :owner_id
      t.integer :milestone_id
      t.integer :project_id
      t.boolean :completed

      t.timestamps
    end
  end

  def self.down
    drop_table :stories
  end
end
