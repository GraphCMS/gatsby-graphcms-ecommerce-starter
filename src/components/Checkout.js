import React, { useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { navigate } from 'gatsby';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from '../components/CheckoutForm';
import CheckoutItemList from './CheckoutItemList';

function Checkout() {
  const { isEmpty } = useCart();

  useEffect(() => {
    if (isEmpty) {
      const navigateTimer = setTimeout(() => {
        navigate(`/cart`);
      }, 3000);

      return () => clearTimeout(navigateTimer);
    }
  }, [isEmpty]);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <Elements>
      <div className="md:flex -mx-4">
        <div className="md:w-1/2 lg:w-2/5 px-4 order-last">
          <div className="md:sticky md:top-0">
            <CheckoutItemList />
          </div>
        </div>
        <div className="md:w-1/2 lg:w-3/5 px-4 order-first">
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
}

export default Checkout;
