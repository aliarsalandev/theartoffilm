import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Benny",
      email: "aliarsalan.dev@gmail.com",
      password: bcrypt.hashSync("Zakaria@369", 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: "Puma",
        logo: "/images/logo1.png",
        description: "best seller",
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: "Henry",
      email: "henry@theartoffilms.co.uk",
      password: bcrypt.hashSync("Zakaria@369", 8),
      isAdmin: false,
    },

    {
      name: "Joanna",
      email: "jo.welland@magiccaterpillar.co.uk",
      password: bcrypt.hashSync("Zakaria@369", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Raiders of the Lost Ark",
      // brand: 'NaN',
      // category: 'Filme Poster',
      image: "/images/posters/Raiders-of-the-Lost-Ark.jpg",
      director: "NaN",
      cast: "NaN",
      artist: "NaN",
      origin: "NaN",
      year: 1930,
      format: "NaN",
      condition: "NaN",
      rolledFolded: "NaN",
      countInStock: 1,
      price: 75,
      salePrice: 0,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at accumsan mauris. Quisque felis turpis, hendrerit id euismod id, faucibus non mi.",
      rating: 0.0,
      numReviews: 0,
      visible: false,
      forSale: false,
    },
    {
      name: "The Silence of the Lambs",
      // brand: 'NaN',
      // category: 'Filme Poster',
      image: "/images/posters/SilenceoftheLambs.jpg",
      director: "NaN",
      cast: "NaN",
      year: 1930,
      salePrice: 0,

      artist: "NaN",
      origin: "NaN",
      format: "NaN",
      condition: "NaN",
      rolledFolded: "NaN",
      countInStock: 1,
      price: 45,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at accumsan mauris. Quisque felis turpis, hendrerit id euismod id, faucibus non mi.",
      rating: 0.0,
      numReviews: 0,
      visible: false,
      forSale: false,
    },
    {
      name: "Rocketeer",
      // brand: 'NaN',
      // category: 'Filme Poster',
      image: "/images/posters/Rocketeer.jpg",
      director: "NaN",
      year: 1930,
      salePrice: 0,

      cast: "NaN",
      artist: "NaN",
      origin: "NaN",
      format: "NaN",
      condition: "NaN",
      rolledFolded: "NaN",
      countInStock: 1,
      price: 100,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at accumsan mauris. Quisque felis turpis, hendrerit id euismod id, faucibus non mi.",
      rating: 0.0,
      numReviews: 0,
      visible: false,
      forSale: false,
    },
    {
      name: "Singin In The Rain",
      // brand: 'NaN',
      // category: 'Filme Poster',
      image: "/images/posters/SinginintheRain.jpg",
      director: "NaN",
      cast: "NaN",
      year: 1930,
      salePrice: 0,

      artist: "NaN",
      origin: "NaN",
      format: "NaN",
      condition: "NaN",
      rolledFolded: "NaN",
      countInStock: 0,
      price: 55,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at accumsan mauris. Quisque felis turpis, hendrerit id euismod id, faucibus non mi.",
      rating: 0.0,
      numReviews: 0,
      visible: false,
      forSale: false,
    },
  ],
  directors: [
    {
      name: "Steven Spielberg",
    },
    {
      name: "Quentin Tarantino",
    },
    {
      name: "James Cameron",
    },
    {
      name: "Martin Scorsese",
    },
    {
      name: "Christopher Nolan",
    },
    {
      name: "Ridley Scott",
    },
  ],
  casts: [
    {
      name: "Steven Spielberg",
    },
    {
      name: "Quentin Tarantino",
    },
    {
      name: "James Cameron",
    },
  ],
  artists: [
    {
      name: "Steven Spielberg",
    },
    {
      name: "Quentin Tarantino",
    },
    {
      name: "James Cameron",
    },
  ],
};
export default data;
