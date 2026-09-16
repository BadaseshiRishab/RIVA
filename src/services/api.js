import { fallbackProducts } from '../components/ProductSection';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const readResponse = async (response, fallbackMessage) => {
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : { message: 'The backend server is not running the latest API routes. Restart the backend and try again.' };

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };
};

export const registerUser = async (payload) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

export const loginUser = async (payload) => {
  const identifier = payload?.emailOrPhone ?? payload?.email ?? payload?.phone ?? '';
  const body = {
    password: payload?.password,
    ...(identifier.includes('@') ? { email: identifier } : { phone: identifier }),
  };

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const loginAdmin = async (payload) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Admin login failed');
  }

  return data;
};

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user');
  }

  return data;
};

export const updateProfile = async (payload) => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update profile');
  }

  return data;
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok && Array.isArray(data) && data.length > 0) {
      return data;
    }

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch products');
    }

    if (Array.isArray(data) && data.length === 0) {
      console.warn('No products returned from API; using local catalog fallback.');
      return fallbackProducts;
    }
  } catch (error) {
    console.warn('Using fallback products because the API request failed:', error.message);
    return fallbackProducts;
  }

  return fallbackProducts;
};

export const fetchMyOrders = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch orders');
  }

  return data;
};

export const createOrderRequest = async (payload) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create order');
  }

  return data;
};

export const createRazorpayOrder = async (items) => {
  const response = await fetch(`${API_URL}/payments/razorpay/order`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to start payment');
  }

  return data;
};

export const createProduct = async (payload) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return readResponse(response, 'Failed to create product');
};

export const updateProduct = async (id, payload) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return readResponse(response, 'Failed to update product');
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return readResponse(response, 'Failed to delete product');
};

export const fetchAdminOrders = async () => {
  const response = await fetch(`${API_URL}/admin/orders`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  return readResponse(response, 'Failed to fetch admin orders');
};

export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/admin/orders/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  return readResponse(response, 'Failed to update order status');
};
