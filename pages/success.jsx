import React, { useEffect } from 'react';
import { AiFillCheckSquare, AiFillCloseSquare } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useStateContext } from '../context/StateContext';

function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const router = useRouter();
  // const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className="success--wrapper">
      <div className="success">
        {router.query.success === 'true' ? (
          <>
            <p>
              <AiFillCheckSquare className="success--icon" />
            </p>
            <h2>Thank you for your order!</h2>
            <p className="success--email-msg">Check your email inbox for the receipt.</p>
            <p className="success--description">
              If you have any questions, please email
              {' '}
              <a className="success--email" href="mailto:order@techhub.com">order@techhub.com</a>
              .
            </p>
            <Link href="/">
              <button type="button" className="success--btn">
                Continue Shopping
              </button>
            </Link>
          </>
        ) : (
          <>
            <p>
              <AiFillCloseSquare className="success--icon canceled" />
            </p>
            <h2>Something went wrong...</h2>
            <p className="success--description">
              Unfortunately we were not able to finish your order. You can contact our support:
              {' '}
              <a className="success--email" href="mailto:support@techhub.com">support@techhub.com</a>
              .
            </p>
            <Link href="/">
              <button type="button" className="success--btn">
                Back to store
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Success;
