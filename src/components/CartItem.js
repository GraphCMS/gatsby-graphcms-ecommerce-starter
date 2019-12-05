import React from 'react';
import { useCart } from 'react-use-cart';
import Img from 'gatsby-image';

function CartItem({ id, name, quantity, price, image }) {
  const { updateItemQuantity, removeItem } = useCart();

  const increment = () => updateItemQuantity(id, quantity + 1);
  const decrement = () => updateItemQuantity(id, quantity - 1);
  const remove = () => removeItem(id);

  const total = quantity * price;

  const formattedUnitPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / 100);

  const formattedLineTotal = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(total / 100);

  return (
    <div
      key={id}
      className="bg-gainsboro rounded md:flex md:items-center py-3 md:py-6 px-3 md:px-6"
    >
      <div className="md:w-2/3 flex items-center">
        <div className="mr-3 lg:mr-6 relative">
          <Img
            className="h-16 md:h-20 w-16 md:w-20"
            fluid={image.childImageSharp.fluid}
            alt={name}
            title={name}
          />
          <button
            className="w-5 h-5 bg-slategray hover:bg-primary text-white text-xs flex items-center justify-center absolute top-0 right-0 -mt-1 -mr-1 rounded"
            onClick={remove}
          >
            <svg
              className="fill-current w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>

        <div>
          <h4 className="text-slategray font-medium mb-3">{name}</h4>
          <p className="text-lightgray text-sm">SKU</p>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="text-slategray hover:text-primary focus:outline-none p-3"
            onClick={increment}
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
            </svg>
          </button>

          <span className="mx-3 md:mx-6 p-3">{quantity}</span>

          <button
            className="text-slategray hover:text-primary focus:outline-none p-3"
            onClick={decrement}
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>

        <div className="text-right">
          <p className="font-medium text-slategray">{formattedLineTotal}</p>
          {quantity > 1 && (
            <p className="text-lightgray text-sm">{formattedUnitPrice} each</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
