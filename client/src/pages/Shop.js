import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './shop.css'
import {BsTruck , BsPatchCheck , BsHeadset} from 'react-icons/bs'
import { getApiUrl, getAssetUrl } from '../config/api'

function Shop() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
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
        fetchProducts()
    }, [])

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category === 'All' || product.category === category
        return matchesSearch && matchesCategory
    })

    const openModal = (product) => {
        setSelectedProduct(product)
        setQuantity(1)
    }

    const closeModal = () => {
        setSelectedProduct(null)
    }

    if (loading) {
        return (
            <div className='loading'>
                <p>Loading products...</p>
            </div>
        )
    }

    return (
        <div className='shop'>

            <div className='shop-header' data-aos='fade-up'>
                <div className='section-divider'></div>
                <h2>Miz Jays <span>Shop</span></h2>
                <p>Premium beauty products for you</p>
            </div>

            <div className='shop-controls' data-aos='fade-up'>
                <div className='shop-search'>
                    <input
                        type='text'
                        placeholder='Search products...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className='shop-categories'>
                    {['All', 'Hair Products', 'Skin Care', 'Nail Products', 'Other'].map((cat) => (
                        <button
                            key={cat}
                            className={`cat-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className='shop-grid'>
                {filteredProducts.length === 0 ? (
                    <div className='no-products'>
                        <p>No products found</p>
                    </div>
                ) : (
                    filteredProducts.map((product, index) => (
                        <div
                            className='product-card'
                            key={product._id}
                            data-aos='fade-up'
                            data-aos-delay={index * 100}
                        >
                            <div className='product-card-img'>
                                {product.image ? (
                                    <img src={getAssetUrl(product.image)} alt={product.name} />
                                ) : (
                                    <div className='product-placeholder'></div>
                                )}
                                {product.inStock ? (
                                    <span className='stock-badge in'>In Stock</span>
                                ) : (
                                    <span className='stock-badge out'>Out of Stock</span>
                                )}
                            </div>
                            <div className='product-card-body'>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <div className='product-card-footer'>
                                    <span className='product-price'>GH₵ {product.price}</span>
                                    <button
                                        className='view-btn'
                                        onClick={() => openModal(product)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedProduct && (
                <div className='modal-overlay' onClick={closeModal}>
                    <div className='modal' onClick={(e) => e.stopPropagation()}>

                        <button className='modal-close' onClick={closeModal}>×</button>

                        <div className='modal-content'>

                            <div className='modal-img'>
                                {selectedProduct.image ? (
                                    <img src={getAssetUrl(selectedProduct.image)} alt={selectedProduct.name} />
                                ) : (
                                    <div className='product-placeholder'></div>
                                )}
                            </div>

                            <div className='modal-info'>
                                <h2>{selectedProduct.name}</h2>
                                <p className='modal-price'>GH₵ {selectedProduct.price}</p>

                                <span className={`modal-stock ${selectedProduct.inStock ? 'in' : 'out'}`}>
                                    {selectedProduct.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                                </span>

                                <p className='modal-description'>{selectedProduct.description}</p>

                                <div className='modal-quantity'>
                                    <span>Quantity:</span>
                                    <div className='quantity-controls'>
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/233559912316?text=Hi Miz Jays! I would like to order ${quantity}x ${selectedProduct.name} at GH₵${selectedProduct.price} each 😊`}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='btn-primary modal-order-btn'
                                >
                                    Contact To Order
                                </a>

                            <div className='modal-badges'>
    <div className='modal-badge'>
        <BsTruck />
        <p>Pickup available</p>
    </div>
    <div className='modal-badge'>
        <BsPatchCheck />
        <p>100% Authentic</p>
    </div>
    <div className='modal-badge'>
        <BsHeadset />
        <p>Customer Support</p>
    </div>
</div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            )}

        </div>
    )
}

export default Shop