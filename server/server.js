// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-relations
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

const { ApolloServer, gql } = require('apollo-server-express');
/*const  { typeDefs } = require('./schema.js');
const  { resolvers } = require('./schema.js');*/

const db = {
	products: [    {
        id: 1,
        name: "Sony ICF-SC1",
        model: "icf-sc1",
        brand: 110,
        category: 1004,
        userguide: "https:\/\/user.guide\/index.php?from=6"
    },
    {
        id: 2,
        name: "Sony SFM1",
        model: "sfm1",
        brand: 110,
        category: 1004,
        userguide: "https:\/\/user.guide\/index.php?from=7"
    },
    {
        id: 3,
        name: "Canon Imageformula Scanfront 300p Cac\/Piv Network Scanner 4575B007",
        model: "canon_imageformula_scanfront_300p_cac_piv_network_scanner_4575b007",
        brand: 103,
        category: 1004,
        userguide: "https:\/\/user.guide\/index.php?from=261298"
    },
    {
        id: 4,
        name: "Canon Scanner 101",
        model: "canon_scanner_101",
        brand: 103,
        category: 1004,
        userguide: "https:\/\/user.guide\/index.php?from=261299"
    },
    {
        id: 5,
        name: "Sony DPP-M55",
        model: "dpp-m55",
        brand: 110,
        category: 1003,
        userguide: "https:\/\/user.guide\/index.php?from=234934"
    },
    {
        id: 6,
        name: "Sony LPR-1000MD",
        model: "lpr-1000md",
        brand: 110,
        category: 1003,
        userguide: "https:\/\/user.guide\/index.php?from=234935"
    },
    {
        id: 7,
        name: "Apple LQ",
        model: "lq",
        brand: 102,
        category: 1003,
        userguide: "https:\/\/user.guide\/index.php?from=235046"
    },
    {
        id: 8,
        name: "Apple B2867757",
        model: "b2867757",
        brand: 102,
        category: 1003,
        userguide: "https:\/\/user.guide\/index.php?from=235047"
    },
    {
        id: 9,
        name: "Apple 6500",
        model: "6500",
        brand: 102,
        category: 1003,
        userguide: "https:\/\/user.guide\/index.php?from=235048"
    },
    {
        id: 10,
        name: "Epson COLOR 850",
        model: "color_850",
        brand: 105,
        category: 1003,
        userguide: "https:\/\/user.guide\/index.php?from=236174"
    },
    {
        id: 11,
        name: "Epson COLOR 860",
        model: "color_860",
        brand: 105,
        category: 1003,
        userguide: "https:\/\/user.guide\/index.php?from=236175"
    },
    {
        id: 12,
        name: "Sony Mobile Xperia tipo ST21A",
        model: "sony_mobile_xperia_tipo_st21a",
        brand: 110,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=48354"
    },
    {
        id: 13,
        name: "Philips CTS900",
        model: "cts900",
        brand: 108,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=48507"
    },
    {
        id: 14,
        name: "Philips D-44867",
        model: "d-44867",
        brand: 108,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=48508"
    },
    {
        id: 15,
        name: "Samsung CURVE 9330",
        model: "curve_9330",
        brand: 109,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=48639"
    },
    {
        id: 16,
        name: "Samsung DFX-5000",
        model: "dfx-5000",
        brand: 109,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=48640"
    },
    {
        id: 17,
        name: "Samsung DM-S105",
        model: "dm-s105",
        brand: 109,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=48641"
    },
    {
        id: 18,
        name: "Apple iPhone 4S A1431",
        model: "iphone_4s_a1431",
        brand: 102,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=49342"
    },
    {
        id: 19,
        name: "Apple iPhone 4s MD257LL\/A",
        model: "iphone_4s_md257ll_a",
        brand: 102,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=49343"
    },
    {
        id: 20,
        name: "Apple iPhone 4 A1332",
        model: "iphone_4_a1332",
        brand: 102,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=49344"
    },
    {
        id: 21,
        name: "Apple iPhone 4 MC536LL\/A",
        model: "iphone_4_mc536ll_a",
        brand: 102,
        category: 1001,
        userguide: "https:\/\/user.guide\/index.php?from=49345"
    },
    {
        id: 22,
        name: "Sony CG-FX120K",
        model: "cg-fx120k",
        brand: 110,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=158711"
    },
    {
        id: 23,
        name: "Acer TravelMate 800 Series",
        model: "travelmate_800_series",
        brand: 101,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=159672"
    },
    {
        id: 24,
        name: "Dell Laptop 7537",
        model: "dell_laptop_7537",
        brand: 104,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=160773"
    },
    {
        id: 25,
        name: "IBM THINKPAD X32",
        model: "thinkpad_x32",
        brand: 106,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=162774"
    },
    {
        id: 26,
        name: "IBM THINKVANTAGE T60",
        model: "thinkvantage_t60",
        brand: 106,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=162775"
    },
    {
        id: 27,
        name: "Lenovo Flex 15 15.6 59387570",
        model: "lenovo_flex_15_15_6_59387570",
        brand: 107,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=163176"
    },
    {
        id: 28,
        name: "Lenovo G500 59373044",
        model: "lenovo_g500_59373044",
        brand: 107,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=163177"
    },
    {
        id: 29,
        name: "Lenovo THINKPAD W510",
        model: "thinkpad_w510",
        brand: 107,
        category: 1002,
        userguide: "https:\/\/user.guide\/index.php?from=165738"
    }
	],
  categories: [
		{
			name:"cell_phone",
			products:[12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
			id: 1001
		},
		{
			name:"laptop",
			products:[24, 25, 26, 27, 28, 29],
			id: 1002
		},
		{
			name:"printer",
			products:[5, 6, 7, 8, 9, 10, 11],
			id: 1003
		},
		{
			name:"scanner",
			products:[1, 2, 3, 4],
			id: 1004
		}
	],
  brands: [
		{
			name:"acer",
			products:[23],
			id: 101
		},
		{
			name:"apple",
			products:[7, 8, 9, 18, 19, 20, 21],
			id: 102
		},
		{
			name:"canon",
			products:[3, 4],
			id: 103
		},
		{
			name:"dell",
			products:[24],
			id: 104
		},
		{
			name:"epson",
			products:[10, 11],
			id: 105
		},
		{
			name:"ibm",
			products:[25, 26],
			id: 106
		},
		{
			name:"lenovo",
			products:[27, 28, 29],
			id: 107
		},
		{
			name:"philips",
			products:[13, 14],
			id: 108
		},
		{
			name:"samsung",
			products:[15, 16, 17],
			id: 109
		},
		{
			name:"sony",
			products:[1, 2, 5, 6,12, 22],
			id: 110
		}
	]
};

const typeDefs = gql`
	type Query {
    products: [Product]
    product(id: Int!): Product
    productsOfBrand(brand: String): [Product]
    productsOfCategory(category: String): [Product]
    productsOfBrandAndCategory(category : String, brand: String): [Product]
    brands: [Brand]
    brand(id: Int!): Brand
    categories: [Category]
    category(id: Int!): Category
  }
  type Product {
    id: Int
    brand: Brand
    category: Category
    model: String
    name: String
    userguide: String
  }
  type Brand {
    products: [Product]
    id: Int
    name: String
  }
  type Category {
    products: [Product]
    id: Int
    name: String
  }
`;


class Product {
  constructor({ brand, category, ...rest }) {
    Object.assign(this, rest);
    this.brandId = brand;
    this.categoryId = category;
  }

  category() {
    const category = db
      .categories
      .find(({ id }) => id === this.categoryId);

    return new Category(category);
  }

  brand() {
    const brand = db
      .brands
      .find(({ id }) => id === this.brandId);

    return new Brand(brand);
  }
}

class Brand {
  constructor({ products, ...rest }) {
    Object.assign(this, rest);
    this.productIds = products;
  }

  products() {
    return db.products
      .filter(({ id }) => this.productIds.includes(id))
      .map(product => new Product(product));
  }
}

class Category {
  constructor({ products, ...rest }) {
    Object.assign(this, rest);
    this.productIds = products;
  }

  products() {
    return db.products
      .filter(({ id }) => this.productIds.includes(id))
      .map(product => new Product(product));
  }
}
// A map of functions which return data for the schema.
const resolvers = {
	Query: {
		product: (parent, { id }) => {
			return new Product(db.products.find(product => product.id === id));
		},
		products : () => {
			return db
				.products
				.map(product => new Product(product));
		},
		productsOfBrand: (parent, { brand }) => {
			 let brandObj = db.brands.filter((br) => { 
					 return (br.name == brand); 
				});
       let products = db.products.filter((product) => {
          return (product.brand == brandObj[0].id)
				});
		   return products.map(product => new Product(product));
		},
		productsOfCategory: (parent, { category }) => {
			 let catObj = db.categories.filter((cat) => { 
					 return (cat.name == category); 
				});
       let products = db.products.filter((product) => {
          return (product.category == catObj[0].id)
				});
		   return products.map(product => new Product(product));
		},
		productsOfBrandAndCategory: (parent, { category, brand }) => {
			 let brandObj = db.brands.filter((br) => { 
					 return (br.name == brand); 
				});
			 let catObj = db.categories.filter((cat) => { 
					 return (cat.name == category); 
				});
       let products = db.products.filter((product) => {
          return (product.brand == brandObj[0].id && product.category == catObj[0].id)
				});
		   return products.map(product => new Product(product));
		},
		brands : () => {
			return db
				.brands
				.map(brand => new Brand(brand));
		},
		categories : () => {
			return db
				.categories
				.map(category => new Category(category));
		},
		brand: (parent, { id })  =>{
			const brand = db
				.brands
				.find(brand => brand.id === id);

			return new Brand(brand);
		},
		category: (parent, { id })  =>{
			const category = db
				.categories
				.find(category => category.id === id);

			return new Category(category);
		},
	}
};


const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
});

var app = module.exports = loopback();
app.set('view engine', 'ejs'); // LoopBack comes with EJS out-of-box
app.set('json spaces', 2); // format json responses for easier viewing

// must be set to serve views properly when starting the app via `slc run` from
// the project root
app.set('views', path.resolve(__dirname, 'views'));

server.applyMiddleware({ app });

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      console.log('Browse your GraphQL Playground at %s/graphql', baseUrl);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
