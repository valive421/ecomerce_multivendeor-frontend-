# React Store Frontend

## Features

- **Home Page:**  
  - Displays latest products, popular products, popular sellers, and popular categories.
  - Fetches product data from the backend API.
- **Product Search:**  
  - Search bar in the header allows users to search for products by name or description.
  - Search results page displays products matching the search term or prefix.
  - Integrates with backend API for fast, accurate product search.
- **All Products Page:**  
  - Shows all products with pagination.
  - Fetches and displays products from the backend.
- **Category List Page:**  
  - Lists all product categories with pagination.
  - Each category links to its product list.
- **Category Products Page:**  
  - Shows products for a specific category with pagination.
  - Fetches products by category from the backend.
- **Product Detail Page:**  
  - Displays detailed information for a single product, including images, vendor info, and meta info.
  - Allows adding/removing product from cart and wishlist.
  - Shows and allows submitting customer reviews.
  - Displays related products with pagination.
- **Cart and Wishlist:**  
  - Add/remove products to/from cart and wishlist.
  - Cart and wishlist are managed via React context.
- **Review System:**  
  - Customers can submit reviews and ratings for products.
  - Reviews are displayed with customer profile pictures if available.
- **Seller Functionality:**  
  - Displays popular sellers on the home page.
  - Vendor information is shown on the product detail page.
  - Each product is linked to its vendor, and vendor details are fetched from the backend.
- **Customer Functionality:**  
  - Customers can register, log in, and manage their profile (if implemented in backend).
  - Customers can add products to cart and wishlist.
  - Customers can submit reviews and ratings for products.
  - Customer profile pictures are shown in reviews (if available).
- **Responsive UI:**  
  - Uses Bootstrap and glassmorphism styles for a modern, responsive design.
- **API Integration:**  
  - All product, category, seller, customer, and review data is fetched from a Django REST API backend.
- **Pagination:**  
  - All product and category lists support pagination with page navigation controls.
- **Related Products:**  
  - Product detail page shows related products from the same category with pagination.
- **Meta Info:**  
  - Product meta information and vendor details are shown on the product detail page.
- **Error Handling:**  
  - Displays loading indicators and error messages for failed API requests or empty results.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## How the Project Works

1. **Home Page:**  
   The home page fetches and displays the latest products, popular products, sellers, and categories. It uses the backend API to get real product and seller data.

2. **Product Browsing:**  
   Users can browse all products or filter by category. Pagination controls allow navigation through multiple pages of products or categories.

3. **Product Details:**  
   Clicking a product shows its detail page, including images, price, description, vendor info, and customer reviews. Users can add/remove the product from their cart or wishlist. Vendor (seller) information is displayed, and related products are shown.

4. **Cart and Wishlist:**  
   Cart and wishlist are managed globally using React context, allowing users to add or remove products from anywhere in the app.

5. **Reviews:**  
   Logged-in customers can submit reviews and ratings for products. Reviews are displayed with customer names and profile pictures.

6. **Related Products:**  
   The product detail page also shows related products from the same category, with pagination.

7. **Sellers:**  
   Popular sellers are displayed on the home page. Each product is associated with a vendor, and vendor details are shown on the product detail page.

8. **Customers:**  
   Customers can interact with products by adding them to cart/wishlist and submitting reviews. Customer profile pictures are shown in reviews if available.

9. **API Communication:**  
   All data (products, categories, sellers, customers, reviews, etc.) is fetched from a Django REST API backend. The frontend handles pagination, mapping, and UI rendering.

10. **Styling:**  
    The UI uses Bootstrap and custom glassmorphism styles for a modern look and responsive layout.
