import fetch from 'isomorphic-unfetch';
import { React, useState } from 'react';
import Image from 'next/image';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from '../../../context/StateContext';
import Link from 'next/Link';

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

function Product({ product }) {
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    function handleBuyNow() {
        onAdd(product, qty);

        setShowCart(true);
    }

    return (
        <div className='product-detail'>
            <div className='product-detail--container'>
                <div>
                    <div className='product-detail--image-container'>
                        <Image
                            loader={myLoader}
                            src={product.imagesLinks && product.imagesLinks[index]}
                            className='product-detail--image'
                            alt={product.title}
                            width={400}
                            height={400}
                            style={{
                                objectFit: 'contain',
                                objectPosition: '50% 50%',
                            }}
                        />
                    </div>
                    <div className='product-detail--small-images-container'>
                        {product.imagesLinks?.map((img, i) => (
                            <Image
                                key={i}
                                src={img}
                                className={i === index ?
                                    "product-detail--small-image selected-image" :
                                    "product-detail--small-image"
                                }
                                alt={product.title}
                                onMouseEnter={() => setIndex(i)}
                                width={100}
                                height={100}
                                loader={myLoader}
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: '50% 50%',
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className='product-detail--description'>
                    <h1>
                        {product.title}
                    </h1>
                    <div className="product-detail--reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>
                        {product.description}
                    </p>
                    <p className="product-detail--price">
                        ${product.price}
                    </p>

                    <div className="product-detail--quantity">
                        <h3>Quantity:</h3>

                        <p className="quantity-desc">
                            <span
                                className="minus"
                                onClick={decQty}>
                                <AiOutlineMinus />
                            </span>

                            <span
                                className="num"
                            >
                                {qty}
                            </span>

                            <span
                                className="plus"
                                onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>

                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={() => onAdd(product, qty)}
                        >
                            Add to cart
                        </button>

                        <button
                            type="button"
                            className="buy-now"
                            onClick={handleBuyNow}
                        >
                            Buy now
                        </button>
                    </div>
                    <div className='product-detail--categories'>
                        <p>Category: </p>
                        <Link key={product.category} href={`/products?category=${product.category}`} className='product-detail--category'>
                            {product.category}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

Product.getInitialProps = async ({ query: { id } }) => {
    const productRes = await fetch(`http://localhost:3000/api/products/${id}`);
    const { data: product } = await productRes.json();

    const categoryRes = await fetch(`http://localhost:3000/api/categories/${product.category}`);
    const { data: categoryName } = await categoryRes.json();

    product.category = categoryName;

    return { product };
};

export default Product