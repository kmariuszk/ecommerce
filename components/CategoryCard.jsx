import React from 'react'
import Link from 'next/Link';

function CategoryCard({ category, description }) {
    return (
        <div className='categoryCard'>
            <Link className='categoryCard--card' href={`products/${category.toLowerCase()}`}>
                <p className='categoryCard--title'>
                    {category}
                </p>
                <p className='categoryCard--description'>
                    {description}
                </p>
            </Link>
        </div>
    )
}

export default CategoryCard