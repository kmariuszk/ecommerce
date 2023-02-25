import React from 'react'
import Link from 'next/Link';
import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

function CategoryCard({ category, image }) {
    return (
        <div className='categoryCard'>
            <Link className='categoryCard--card' href={`products/?category=${category.toLowerCase()}`}>
                <p className='categoryCard--image'>
                    <Image
                        className='productCard--image'
                        loader={myLoader}
                        width={300}
                        height={500}
                        style={{
                            objectFit: 'cover',
                            objectPosition: '50% 0%',
                        }}
                        alt="Category--image"
                        src={image}>
                    </Image>
                </p>
                <p className='categoryCard--title'>
                    {category}
                </p>
            </Link>
        </div >
    )
}

export default CategoryCard