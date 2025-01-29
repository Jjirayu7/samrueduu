const userController = require('./controllers/UserController');
const productController = require('./controllers/ProductController');
const saleController = require('./controllers/SaleController');
const userCustomerController = require('./controllers/UserCustomerController');
const dashboardController = require('./controllers/DashboardController');
const orderController = require('./controllers/OrderController')

const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/user', userController);
app.use('/product', productController);
app.use('/api/sale', saleController);
app.use('/user/customer', userCustomerController);
app.use('/api/dashboard', dashboardController);
app.use('/order', orderController);

app.listen(3001);

