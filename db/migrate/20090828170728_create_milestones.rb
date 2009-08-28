class CreateMilestones < ActiveRecord::Migration
  def self.up
    create_table :milestones do |t|
      t.string :name
      t.string :description
      t.integer :owner_id
      t.integer :project_id
      t.boolean :completed

      t.timestamps
    end
  end

  def self.down
    drop_table :milestones
  end
end
