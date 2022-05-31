import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Benny',
      email: 'aliarsalan.dev@gmail.com',
      password: bcrypt.hashSync('Zakaria@369', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'Henry',
      email: 'henry@theartoffilms.co.uk',
      password: bcrypt.hashSync('Zakaria@369', 8),
      isAdmin: false,
    },

    {
      name: 'Joanna',
      email: 'jo.welland@magiccaterpillar.co.uk',
      password: bcrypt.hashSync('Zakaria@369', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Raiders of the Lost Ark',
      category: 'Filme Poster',
      image: '/images/posters/Raiders-of-the-Lost-Ark.jpg',
      price: 75,
      countInStock: 1,
      brand: 'NaN',
      rating: 0.0,
      numReviews: 0,
      description: 'NaN',
    },
    {
      name: 'The Silence of the Lambs',
      category: 'Filme Poster',
      image: '/images/posters/SilenceoftheLambs.jpg',
      price: 45,
      countInStock: 1,
      brand: 'NaN',
      rating: 0.0,
      numReviews: 0,
      description: 'NaN',
    },
    {
      name: 'Rocketeer',
      category: 'Filme Poster',
      image: '/images/posters/Rocketeer.jpg',
      price: 100,
      countInStock: 1,
      brand: 'NaN',
      rating: 0.0,
      numReviews: 0,
      description: 'NaN',
    },
    {
      name: 'Singin In The Rain',
      category: 'Filme Poster',
      image: '/images/posters/SinginintheRain.jpg',
      price: 55,
      countInStock: 0,
      brand: 'NaN',
      rating: 0.0,
      numReviews: 0,
      description: 'NaN',
    },
  ],
};
export default data;
