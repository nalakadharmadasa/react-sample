import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { QueryClientProvider, queryClient } from './api/queryClient';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetails';

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path="/" element={<ProductList />} />
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
