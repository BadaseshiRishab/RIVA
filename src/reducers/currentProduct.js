
const getStoredProduct = () => {
	try {
		const storedProduct = localStorage.getItem('currentProduct');
		if (!storedProduct || storedProduct === 'undefined') {
			return null;
		}

		const parsedProduct = JSON.parse(storedProduct);
		return parsedProduct && typeof parsedProduct === 'object' ? parsedProduct : null;
	} catch (error) {
		console.error('Failed to parse current product from localStorage:', error);
		return null;
	}
};

const initialState = getStoredProduct();

const currentProduct = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CURRENT_PRODUCT':
			if (action.payload) {
				localStorage.setItem('currentProduct', JSON.stringify(action.payload));
				return action.payload;
			}
			return state;
		default:
			return state;
	}
};

export default currentProduct;
