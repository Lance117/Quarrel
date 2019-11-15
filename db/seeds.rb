# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = User.create([{username: 'Ralph Macchio', email: 'karatekid@gmail.com', password: 'karatekid'}])
users = User.create([{username: 'Ted Danson', email: 'teddanson@gmail.com', password: '123456'}])
users = User.create([{username: 'Ralph Macchio', email: 'karatekid@gmail.com', password: 'karatekid'}])
Channel.create(channel_name: 'tv shows')
Channel.create(channel_name: 'Kpop')
Channel.create(channel_name: 'bobaholics')
