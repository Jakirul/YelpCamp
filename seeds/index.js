const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedsHelpers');
const Campground = require("../models/campground");


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length )];

const seedDB = async() => {
    // this deletes everything
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '5fec84f8be8afa20780cc5d2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum ad magnam odio sunt dolores expedita, minus reprehenderit alias consequatur asperiores voluptatum, adipisci sequi repellat dolorem, illo ut voluptatibus at. Maiores.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dnfjnuqze/image/upload/v1609599378/YelpCamp/yvgysaigfyce6fvmeovx.png',
                  filename: 'YelpCamp/yvgysaigfyce6fvmeovx'
                },
                {
                  url: 'https://res.cloudinary.com/dnfjnuqze/image/upload/v1609599377/YelpCamp/tyxifr3vh73ufsfjymuv.png',
                  filename: 'YelpCamp/tyxifr3vh73ufsfjymuv'
                },
                {
                  url: 'https://res.cloudinary.com/dnfjnuqze/image/upload/v1609599383/YelpCamp/hprdjb999qe5kskgugah.png',
                  filename: 'YelpCamp/hprdjb999qe5kskgugah'
                }
              ]
        })
        await camp.save();
    }
}

// seedsDB() connects to the databse. the .then() is something after, so here we then close the db
seedDB().then(() => {
    console.log("closing db...")
    mongoose.connection.close();
})