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
      // brand: '',
      // category: 'Filme Poster',
      image: "/images/posters/Raiders-of-the-Lost-Ark.jpg",
      images: [],
      director: "",
      cast: "",
      artist: "",
      origin: "",
      year: 1930,
      format: "",
      condition: "",
      rolledFolded: "",
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
      // brand: '',
      // category: 'Filme Poster',
      image: "/images/posters/SilenceoftheLambs.jpg",
      images: [],
      director: "",
      cast: "",
      year: 1930,
      salePrice: 0,

      artist: "",
      origin: "",
      format: "",
      condition: "",
      rolledFolded: "",
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
      // brand: '',
      // category: 'Filme Poster',
      image: "/images/posters/Rocketeer.jpg",
      images: [],
      director: "",
      year: 1930,
      salePrice: 0,

      cast: "",
      artist: "",
      origin: "",
      format: "",
      condition: "",
      rolledFolded: "",
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
      // brand: '',
      // category: 'Filme Poster',
      image: "/images/posters/SinginintheRain.jpg",
      images: [],
      director: "",
      cast: "",
      year: 1930,
      salePrice: 0,

      artist: "",
      origin: "",
      format: "",
      condition: "",
      rolledFolded: "",
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
  subscriptions: [
    {
      name: "Basic",
      image: "https://placehold.it/100x100",
      currency: "USD",
      products: 0,
      monthPrice: 0,
      yearPrice: 0,
      perks: ["100 posters per month", "For sale posters"],
    },
    {
      name: "Premium",
      image: "https://placehold.it/100x100",
      currency: "USD",
      monthPrice: 10,
      yearPrice: 100,
      perks: ["200 posters per month", "For sale posters"],
    },
  ],
  sessions: [
    {
      id: "cs_test_a1UeVQoEvc4BRLQ0keGpiEu2Gs1p2NzXajqVfBXW6u3HTEpkM7Dvcv2DQ1",
      url: "https://api.cloudinary.com/v1_1/dzqjqjqj/image/upload/v1599098983/session_1.jpg",
      type: "subscription",
      period: "month",
      ref: "62ab15ac2f9d575c9c1617a8",
      status: "unpaid",
    },
  ],
  settings: [
    {
      commission: 0.0,
      stripe_private_key: "",
      site_logo: "",
      site_favicon: "",
      site_keywords: "",
    },
  ],
  messages: [
    {
      user: "62b06163514d45436276cccb",
      order: "62b0b92e3c8ef8e919bbdc9d",
      message: "Hello",
      read: false,
    },
  ],
};
export default data;
