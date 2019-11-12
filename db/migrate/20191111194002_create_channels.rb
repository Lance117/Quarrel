class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :channel_name, null: false
      t.timestamps
    end
    add_index :channels, :channel_name, unique: true
  end
end
