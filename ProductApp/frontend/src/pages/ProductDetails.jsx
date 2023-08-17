import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function ProductDetails() {
	const { id } = useParams();

	// Sample product data
	const product = {
		id: 1,
		title: 'iPhone 9',
		description: 'An apple mobile which is nothing like apple',
		price: 549,
		discountPercentage: 12.96,
		rating: 4.69,
		stock: 94,
		brand: 'Apple',
		category: 'smartphones',
		thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
		images: [
			'https://i.dummyjson.com/data/products/1/1.jpg',
			'https://i.dummyjson.com/data/products/1/2.jpg',
			'https://i.dummyjson.com/data/products/1/3.jpg',
			'https://i.dummyjson.com/data/products/1/4.jpg',
			'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
		],
	};

	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const [imageWidth, setImageWidth] = useState('80vw'); // Initial width

	useEffect(() => {
		const updateImageWidth = () => {
			const newWidth =
				window.innerWidth > 1400
					? '60vw'
					: window.innerWidth > 768
					? '70vw'
					: '80vw';
			setImageWidth(newWidth);
		};

		// Update width on window resize
		window.addEventListener('resize', updateImageWidth);
		updateImageWidth(); // Call initially

		return () => {
			window.removeEventListener('resize', updateImageWidth);
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
			<h1 className="text-3xl font-semibold mb-6 text-orange-500">
				{product.title}
			</h1>
			<div className="max-w-6xl w-full">
				<div className="flex flex-col md:flex-row justify-center items-center md:gap-6">
					<div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
						<img
							src={product.thumbnail}
							alt={product.title}
							className="w-full h-auto rounded-lg shadow-md"
						/>
					</div>
					<div className="md:w-1/2">
						<p className="text-gray-400 mb-4">{product.description}</p>
						<p className="text-gray-300 mb-4">
							Brand: {product.brand} | Category: {product.category}
						</p>
						<p className="text-lg font-semibold mb-2">${product.price}</p>
						<div className="flex items-center mb-4">
							<span className="text-yellow-500 mr-1">Rating:</span>
							<span className="text-white">{product.rating}</span>
						</div>
						<p className="text-gray-300">
							In Stock: {product.stock} | Discount: {product.discountPercentage}
							%
						</p>
					</div>
				</div>
				<div className="mt-8">
					<div className="md:w-full overflow-x-scroll mb-6">
						<div className={`flex space-x-4`}>
							{product.images.map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`Product`}
									className={`w-full h-auto rounded cursor-pointer ${
										index === selectedImageIndex && 'ring-2 ring-orange-500'
									} hover:scale-105 transform transition-transform duration-300 ease-in-out`}
									style={{ maxWidth: '100%', height: '10vw' }}
									onClick={() => setSelectedImageIndex(index)}
								/>
							))}
						</div>
					</div>
					<div className="md:w-full md:mb-0">
						<TransformWrapper initialScale={1}>
							{({ zoomIn, zoomOut, resetTransform, ...rest }) => (
								<div className="relative w-full mb-4 flex flex-col items-center">
									<TransformComponent>
										<img
											src={product.images[selectedImageIndex]}
											alt={product.images[selectedImageIndex]}
											style={{
												width: imageWidth,
												height: 'auto',
												maxWidth: '100vw',
											}}
											className="rounded"
										/>
									</TransformComponent>
									<div className="tools absolute bottom-0 left-0 right-0 flex justify-center">
										<button
											className="rounded-full bg-gray-800 text-white p-2 m-1 w-1/5 border border-gray-700 hover:bg-gray-700"
											onClick={() => zoomIn()}
										>
											+
										</button>
										<button
											className="rounded-full bg-gray-800 text-white p-2 m-1 w-1/5 border border-gray-700 hover:bg-gray-700"
											onClick={() => zoomOut()}
										>
											-
										</button>
										<button
											className="rounded-full bg-gray-800 text-white p-2 m-1 w-1/5 border border-gray-700 hover:bg-gray-700"
											onClick={() => resetTransform()}
										>
											Reset
										</button>
									</div>
								</div>
							)}
						</TransformWrapper>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
