import fetch from 'isomorphic-unfetch';
import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from '../../../context/StateContext';

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

function Product({ product }) {
    const [index, setIndex] = useState(0);

    // Fetching global variables from the StateContext.js.
    const { decQty, incQty, qty, onAdd } = useStateContext();

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
                            />
                        ))}
                    </div>
                </div>

                <div className='product-detail--description'>
                    <h1>
                        {product.title}
                    </h1>
                    <div className='product-detail--categories'>
                        {/* <div>{product.categories}</div> */}
                        {
                            product.categories.map(category => (
                                <div key={category}>{category}</div>
                            ))
                        }
                    </div>
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
                        // TODO: add functionality to buy the product.
                        // onClick=""
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Product.getInitialProps = async ({ query: { id } }) => {
    const productRes = await fetch(`http://localhost:3000/api/products/${id}`);
    const { data } = await productRes.json();

    

    return { product: data };
};

export default Product