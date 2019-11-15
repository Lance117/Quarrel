# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.create(username: 'Ralph Macchio', email: 'karatekid@gmail.com', password: 'karatekid')
User.create(username: 'Ted Danson', email: 'teddanson@gmail.com', password: '123456')
User.create(username: 'Walter White', email: 'walter@gmail.com', password: '123456')
Channel.create(channel_name: 'tv shows')
Channel.create(channel_name: 'Kpop')
Channel.create(channel_name: 'bobaholics')
Membership.create(user_id: 2, channel_id: 1)
Membership.create(user_id: 2, channel_id: 2)
Membership.create(user_id: 2, channel_id: 3)
Message.create(body: "i need help!", user_id: 1, channel_id: 1)
Message.create(body: "what am i doing with my life", user_id: 1, channel_id: 1)