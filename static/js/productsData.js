const productsData = [
    {
        id: 'tshirt',
        name: 'Classic Comfort T-Shirt for Men',
        brand: 'MyFashion',
        category: 'Apparel',
        mainImage: 'static/images/tshirt.jpg',
        // CORRECTED: Thumbnails should be different views of the T-Shirt
        thumbnails: [
            'static/images/tshirt.jpg',
            'static/images/tshirt_view2.jpg', // Placeholder: Add a second view of the T-shirt
            'static/images/tshirt_view3.jpg', // Placeholder: Add a third view of the T-shirt
            'static/images/tshirt_view4.jpg'  // Placeholder: Add a fourth view of the T-shirt
        ],
        rating: 4.5,
        reviewCount: 2145,
        questionsAnswered: 187,
        currentPrice: '₹ 799',
        originalPrice: '₹ 1,099',
        discount: '28% off',
        stockStatus: 'In Stock',
        deliveryEstimate: 'Sunday, July 14',
        description: 'Experience unparalleled comfort with our Classic Comfort T-Shirt. Made from 100% premium organic cotton, this t-shirt offers a soft touch and breathable feel, perfect for everyday wear or casual outings. Its timeless design ensures it pairs well with anything in your wardrobe.',
        specs: [
            'Material: 100% Organic Cotton',
            'Fit: Regular Fit',
            'Neck Style: Crew Neck',
            'Care Instructions: Machine Wash Cold',
            'Features: Breathable fabric, durable stitching, pre-shrunk'
        ],
        options: {
            size: ['S', 'M', 'L', 'XL'],
            color: ['Blue', 'Black', 'White']
        },
        reviews: [
            { author: 'John D.', date: 'July 10, 2025', stars: 5, title: 'Excellent Quality!', text: 'This t-shirt exceeded my expectations. The fabric is incredibly soft, and it fits perfectly. I\'ve washed it several times, and it still holds its shape and color. Highly recommend!' },
            { author: 'Sarah L.', date: 'July 05, 2025', stars: 4, title: 'Very Comfortable!', text: 'Comfort is key for me, and this t-shirt delivers. It\'s great for everyday wear. Only slight drawback is it wrinkles a bit easily, but overall a solid purchase.' },
            { author: 'Mike R.', date: 'June 28, 2025', stars: 4.5, title: 'Good Value for Money', text: 'For the price, you can\'t beat this. It\'s a basic tee but feels premium. I\'m happy with my purchase and might get a few more in different colors.' }
        ]
    },
    {
        id: 'jeans',
        name: 'Premium Slim-Fit Jeans',
        brand: 'DenimCo',
        category: 'Fashion',
        mainImage: 'static/images/jeans.jpg',
        // CORRECTED: Thumbnails should be different views of the Jeans
        thumbnails: [
            'static/images/jeans.jpg',
            'static/images/jeans_view2.jpg', // Placeholder: Add a second view of the Jeans
            'static/images/jeans_view3.jpg', // Placeholder: Add a third view of the Jeans
            'static/images/jeans_view4.jpg'  // Placeholder: Add a fourth view of the Jeans
        ],
        rating: 4.0,
        reviewCount: 1500,
        questionsAnswered: 120,
        currentPrice: '₹ 1,999',
        originalPrice: '₹ 2,799',
        discount: '28% off',
        stockStatus: 'In Stock',
        deliveryEstimate: 'Monday, July 15',
        description: 'Crafted for style and comfort, these premium slim-fit jeans are a versatile addition to your wardrobe. Made from high-quality denim with a hint of stretch, they offer a perfect fit and freedom of movement. Ideal for both casual and semi-formal occasions.',
        specs: [
            'Material: 98% Cotton, 2% Spandex',
            'Fit: Slim Fit',
            'Wash: Dark Indigo',
            'Closure: Zipper Fly with Button',
            'Features: 5-pocket styling, comfortable stretch, durable'
        ],
        options: {
            size: ['28', '30', '32', '34', '36'],
            color: ['Dark Blue', 'Light Blue', 'Black']
        },
        reviews: [
            { author: 'Ananya R.', date: 'July 08, 2025', stars: 4, title: 'Perfect Fit!', text: 'These jeans fit like a glove and are so comfortable. The material is soft and the color is exactly what I wanted.' },
            { author: 'Vikram S.', date: 'June 20, 2025', stars: 3.5, title: 'Good for the price', text: 'Decent jeans, but a bit tighter than expected around the thighs. Quality is good for the price.' }
        ]
    },
    {
        id: 'hoodie',
        name: 'Super Soft Everyday Hoodie',
        brand: 'CozyWear',
        category: 'Apparel',
        mainImage: 'static/images/hoodie.jpg',
        // CORRECTED: Thumbnails should be different views of the Hoodie
        thumbnails: [
            'static/images/hoodie.jpg',
            'static/images/hoodie_view2.jpg', // Placeholder
            'static/images/hoodie_view3.jpg', // Placeholder
            'static/images/hoodie_view4.jpg'  // Placeholder
        ],
        rating: 5.0,
        reviewCount: 850,
        questionsAnswered: 50,
        currentPrice: '₹ 1,499',
        originalPrice: '₹ 2,000',
        discount: '25% off',
        stockStatus: 'In Stock',
        deliveryEstimate: 'Tuesday, July 16',
        description: 'Wrap yourself in comfort with our Super Soft Everyday Hoodie. Made from a premium cotton blend, this hoodie is incredibly soft, warm, and perfect for lounging or casual outings. It features a spacious front pocket and an adjustable drawstring hood.',
        specs: [
            'Material: 80% Cotton, 20% Polyester',
            'Fit: Relaxed Fit',
            'Hood: Adjustable Drawstring Hood',
            'Pockets: Kangaroo Pocket',
            'Care Instructions: Machine Wash Warm'
        ],
        options: {
            size: ['S', 'M', 'L', 'XL'],
            color: ['Grey', 'Navy', 'Maroon']
        },
        reviews: [
            { author: 'Priya M.', date: 'July 01, 2025', stars: 5, title: 'My New Favorite Hoodie!', text: 'This hoodie is unbelievably soft and cozy. I practically live in it now! The quality is fantastic.' },
            { author: 'Sameer J.', date: 'June 15, 2025', stars: 5, title: 'Excellent Comfort', text: 'Perfect for chilly evenings. The fit is just right, and it feels very durable. Highly recommend this product.' }
        ]
    },
    {
        id: 'sneakers',
        name: 'Dynamic Performance Sneakers',
        brand: 'StridePro',
        category: 'Footwear',
        mainImage: 'static/images/sneakers.jpg',
        // CORRECTED: Thumbnails should be different views of the Sneakers
        thumbnails: [
            'static/images/sneakers.jpg',
            'static/images/sneakers_view2.jpg', // Placeholder
            'static/images/sneakers_view3.jpg', // Placeholder
            'static/images/sneakers_view4.jpg'  // Placeholder
        ],
        rating: 3.5,
        reviewCount: 600,
        questionsAnswered: 45,
        currentPrice: '₹ 2,999',
        originalPrice: '₹ 3,999',
        discount: '25% off',
        stockStatus: 'In Stock',
        deliveryEstimate: 'Wednesday, July 17',
        description: 'Step up your game with Dynamic Performance Sneakers. Engineered for agility and comfort, these shoes feature a lightweight design, responsive cushioning, and a breathable mesh upper. Ideal for running, training, or everyday active wear.',
        specs: [
            'Upper Material: Breathable Mesh',
            'Sole Material: Rubber',
            'Closure: Lace-Up',
            'Features: Lightweight, Responsive Cushioning, Non-slip Sole',
            'Ideal For: Running, Training, Casual Wear'
        ],
        options: {
            size: ['6', '7', '8', '9', '10'],
            color: ['Black/White', 'Blue/Grey', 'Red/Black']
        },
        reviews: [
            { author: 'Arjun V.', date: 'July 03, 2025', stars: 4, title: 'Comfortable for daily wear', text: 'These sneakers are very comfortable for my daily walks. Good cushioning. They look stylish too.' },
            { author: 'Neha G.', date: 'June 25, 2025', stars: 3, title: 'Decent, but not for intense sports', text: 'Good for casual use, but I found them a bit lacking in support for high-intensity workouts. Still, a good everyday shoe.' }
        ]
    },
    {
        id: 'watch',
        name: 'Luxury Chronograph Watch',
        brand: 'Timeless',
        category: 'Accessories',
        mainImage: 'static/images/watch.jpg',
        // CORRECTED: Thumbnails should be different views of the Watch
        thumbnails: [
            'static/images/watch.jpg',
            'static/images/watch_view2.jpg', // Placeholder
            'static/images/watch_view3.jpg', // Placeholder
            'static/images/watch_view4.jpg'  // Placeholder
        ],
        rating: 5.0,
        reviewCount: 300,
        questionsAnswered: 20,
        currentPrice: '₹ 8,999',
        originalPrice: '₹ 12,000',
        discount: '25% off',
        stockStatus: 'In Stock',
        deliveryEstimate: 'Thursday, July 18',
        description: 'Elevate your style with the Luxury Chronograph Watch. This exquisite timepiece features a precision quartz movement, a durable stainless steel case, and a genuine leather strap. Perfect for both formal occasions and everyday elegance.',
        specs: [
            'Movement: Quartz Chronograph',
            'Case Material: Stainless Steel',
            'Strap Material: Genuine Leather',
            'Water Resistance: 50 Meters',
            'Dial Window Material: Mineral Crystal',
            'Features: Date Display, Luminous Hands'
        ],
        options: {
            strap: ['Leather', 'Metal'],
            dialColor: ['Black', 'Silver', 'Blue']
        },
        reviews: [
            { author: 'Rajesh K.', date: 'July 07, 2025', stars: 5, title: 'Stunning Watch!', text: 'Absolutely love this watch. It looks even better in person than in the pictures. Feels very premium and keeps perfect time.' },
            { author: 'Smita P.', date: 'June 29, 2025', stars: 5, title: 'Great Gift', text: 'Bought this for my husband, and he adores it. It\'s elegant and functional. Highly recommend as a gift or for personal use.' }
        ]
    }
    // Add more product objects here following the same structure
];