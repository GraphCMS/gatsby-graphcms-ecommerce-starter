import React from 'react';
import { graphql } from 'gatsby';

import ProductGrid from '../components/ProductGrid';

function ProductsPage({
  data: {
    cms: { products },
  },
}) {
  return (
    <React.Fragment>
      <h1 className="font-bold text-6xl mb-3 text-primary">Latest</h1>

      <hr className="border-b border-gainsboro w-10" />

      <ProductGrid products={products} />
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query ProductsQuery($locale: GraphCMS_Locale!) {
    cms {
      products {
        id
        name(locale: $locale)
        printfulProductId
        printfulProduct {
          productImage {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          variants {
            formattedPrice
            retail_price
          }
        }
      }
    }
  }
`;

export default ProductsPage;
