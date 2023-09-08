import bcrypt from 'bcryptjs';

const data ={
    users:[
      {
        name: 'Keyu',
        email: 'keyu@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true
      },
      {
        name: 'Doe',
        email: 'doe@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false
      },
    ],
    products:[
        {
            name: 'The LaGaurdia Two-piece',
            slug: 'free-shirt',
            category: 'Two-piece',
            image: '/images/andrea_iyamah.png',
            price: 300,
            brand: 'Andrea Iyamah',
            rating: 4.9,
            numReviews: 8,
            countInStock: 5,
            description: 'A popular Two-piece',
            isFeatured: true,
            banner: '/images/andrea_iyamah.jpg',
        },
        {
          name: 'Atafo suit Pants',
          slug: 'atafo-suit-pants',
          category: 'Pants',
          image: '/images/mai_atafo.jpeg',
          price: 300,
          brand: 'Mai Atafo',
          rating: 4.9,
          numReviews: 13,
          countInStock: 20,
          description: 'Smart looking pants',
        },
        {
          name: 'Ugo Two-piece',
          slug: 'ugo-two-piece',
          category: 'Two-piece',
          image: '/images/ugo_monye.jpeg',
          price: 250,
          brand: 'Ugo Monye',
          rating: 4.5,
          numReviews: 7,
          countInStock: 20,
          description: 'A super popular Two-piece',
        },
        {
          name: 'The Rendoll Party-Popper',
          slug: 'rendoll-party-popper',
          category: 'Dress',
          image: '/images/rendoll.jpeg',
          price: 200,
          brand: 'Rendoll',
          rating: 4.2,
          numReviews: 10,
          countInStock: 20,
          description: 'A popular Outfit',
          isFeatured: true,
          banner: '/images/rendoll.jpg',
        },
        {
          name: 'Kai Stylish Dress',
          slug: 'kai-stylish-dress',
          category: 'Dress',
          image: '/images/kai_collective.jpeg',
          price: 250,
          brand: 'Kai Kollective',
          rating: 4.5,
          numReviews: 3,
          countInStock: 20,
          description: 'A popular Dress',
        },
        {
          name: 'The David Classic shirt',
          slug: 'david-classic-shirt',
          category: 'Shirt',
          image: '/images/david_wej.jpeg',
          price: 200,
          brand: 'David Wej',
          rating: 4.4,
          numReviews: 14,
          countInStock: 20,
          description: 'A popular Shirt',
        },

    ]
}

export default data;