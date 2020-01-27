class AddUserToChannels < ActiveRecord::Migration[5.2]
  def change
    add_reference :channels, :user, index: true
    add_foreign_key :channels, :users
  end
end
