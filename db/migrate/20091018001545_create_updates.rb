class CreateUpdates < ActiveRecord::Migration
  def self.up
    create_table :updates do |t|
      t.integer :owner_id
      t.integer :association_id
      t.integer :type_id
      t.string :description
      t.boolean :followed

      t.timestamps
    end
  end

  def self.down
    drop_table :updates
  end
end
