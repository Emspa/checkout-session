import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css"

export const ProductDetailsPage = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const { productId } = useParams<{ productId: string }>();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3002/api/stripe/products/${productId}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [productId]);

    // If the product is not yet loaded, render a loading indicator or null
    if (!product) {
        return <div>Loading...</div>;
    }

    // Now that we have a product, we can safely access product properties
    return(
        <div className='product-detail-container'>
            <img className="product-detail-img" src={product.images[0]} alt={product.name} />
            <div className='product-info'>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: {(product.default_price.unit_amount_decimal / 100).toFixed(2)} kr</p>
                <button onClick={() => {/* add to cart logic */}}>Add to Cart</button>
            </div>
        </div>
    );
};
