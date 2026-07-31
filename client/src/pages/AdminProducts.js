import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getApiUrl } from '../config/api'
import AdminLayout from '../components/AdminLayout'
import './Admin.css'

function AdminProducts() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        rating: '',
        inStock: true
    })

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin')
        }
        fetchProducts()
    }, [
        navigate
    ])

    const fetchProducts = async () => {
        try {
            const response = await axios.get(getApiUrl('/api/products'))
            setProducts(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getToken = () => {
        return localStorage.getItem('adminToken')
    }

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = getToken()
            const headers = { Authorization: `Bearer ${token}` }

            if (editingProduct) {
                await axios.put(
                    getApiUrl(`/api/products/${editingProduct._id}`),
                    formData,
                    { headers }
                )
            } else {
                await axios.post(
                    getApiUrl('/api/products'),
                    formData,
                    { headers }
                )
            }

            setShowForm(false)
            setEditingProduct(null)
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                image: '',
                rating: '',
                inStock: true
            })
            fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image || '',
            rating: product.rating,
            inStock: product.inStock
        })
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = getToken()
                await axios.delete(
                    getApiUrl(`/api/products/${id}`),
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                fetchProducts()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingProduct(null)
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
            rating: '',
            inStock: true
        })
    }

    return (
        <AdminLayout activePage='products' title='Products' subtitle='Manage store products quickly'>
            <div className='admin-main-header'>
                <div />
                <button
                    className='admin-add-btn'
                    onClick={() => setShowForm(true)}
                >
                    + Add Product
                </button>
            </div>

                {showForm && (
                    <div className='admin-form-container'>
                        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit} className='admin-form'>
                            <div className='admin-form-group'>
                                <label>Product Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder='e.g. Hair Growth Shampoo'
                                    required
                                />
                            </div>
                            <div className='admin-form-group'>
                                <label>Category</label>
                                <select
                                    name='category'
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select category</option>
                                    <option value='Hair Products'>Hair Products</option>
                                    <option value='Skin Care'>Skin Care</option>
                                    <option value='Nail Products'>Nail Products</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <div className='admin-form-group'>
                                <label>Description</label>
                                <textarea
                                    name='description'
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder='Describe the product...'
                                    required
                                />
                            </div>
                            <div className='admin-form-group'>
                                <label>Price (GH₵)</label>
                                <input
                                    type='number'
                                    name='price'
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder='e.g. 59.99'
                                    required
                                />
                            </div>
                            <div className='admin-form-group'>
                                <label>Rating (0-5)</label>
                                <input
                                    type='number'
                                    name='rating'
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    placeholder='e.g. 4.5'
                                    min='0'
                                    max='5'
                                    step='0.1'
                                />
                            </div>
                            <div className='admin-form-group'>
                                <label>Image URL (Cloudinary)</label>
                                <input
                                    type='text'
                                    name='image'
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder='https://res.cloudinary.com/...'
                                />
                            </div>
                            <div className='admin-form-group'>
                                <label>In Stock</label>
                                <input
                                    type='checkbox'
                                    name='inStock'
                                    checked={formData.inStock}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='admin-form-buttons'>
                                <button type='submit' className='admin-save-btn'>
                                    {editingProduct ? 'Update Product' : 'Save Product'}
                                </button>
                                <button
                                    type='button'
                                    className='admin-cancel-btn'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <div className='admin-loading'>Loading products...</div>
                ) : (
                    <div className='admin-table-container'>
                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className='admin-table-img'
                                                />
                                            ) : (
                                                <div className='admin-table-placeholder'></div>
                                            )}
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>GH₵ {product.price}</td>
                                        <td>
                                            <span className={`stock-tag ${product.inStock ? 'in' : 'out'}`}>
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className='admin-edit-btn'
                                                onClick={() => handleEdit(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='admin-delete-btn'
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </AdminLayout>
    )
}

export default AdminProducts