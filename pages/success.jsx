/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { AiFillCheckSquare } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Link from 'next/Link';

import { useStateContext } from '../context/StateContext';

function Success() {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
    }, [])

    return (
        <div className="success--wrapper">
            <div className="success">
                <p>
                    <AiFillCheckSquare className="success--icon"/>
                </p>
                <h2>Thank you for your order!</h2>
                <p className='success--email-msg'>Check your email inbox for the receipt.</p>
                <p className="success--description">
                    If you have any questions, please email <a className="success--email" href="mailto:order@techhub.com">order@techhub.com</a>.
                </p>
                <Link href="/">
                    <button type="button" className="success--btn">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success;