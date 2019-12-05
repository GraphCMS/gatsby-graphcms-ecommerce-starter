import React from 'react';
import Img from 'gatsby-image';

import LocaleLink from './LocaleLink';

function Product({ id, name, printfulProduct }) {
  const [{ formattedPrice }] = printfulProduct.variants;

  return (
    <article key={id} className="px-6 py-3 w-full md:p-6 md:w-1/2">
      <LocaleLink to={`/products/${id}`} className="no-underline w-full h-full block">
        <div className="cursor-pointer w-full overflow-hidden relative p-1 bg-gainsboro">
          <Img
            fluid={printfulProduct.productImage.childImageSharp.fluid}
            alt={name}
            title={name}
          />
        </div>

        <div className="py-3 text-center">
          <p className="text-slategray font-medium text-lg">{name}</p>
          <p className="text-lightgray text-sm">{formattedPrice}</p>
        </div>
      </LocaleLink>
    </article>
  );
}

export default Product;
