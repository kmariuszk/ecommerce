import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const myLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`;

function ProductCard({
  id, title, image, price,
}) {
  return (
    <div className="productCard">
      <Link className="productCard--container" href={`product/${id}`}>
        <Image
          className="productCard--image"
          loader={myLoader}
          width={300}
          height={300}
          alt={title}
          src={image}
          style={{
            objectFit: 'contain',
            objectPosition: '50% 50%',
          }}
        />
        <p className="productCard--title">{title}</p>
        <p className="productCard--price">
          $
          {price}
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;
