import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useCart } from 'react-use-cart';
import queryString from 'query-string';
import { navigate } from '@reach/router';

function ProductPage({
  data: {
    cms: { product },
  },
  location,
}) {
  const { variantId } = queryString.parse(location.search);
  const { variants } = product.printfulProduct;
  const [firstVariant] = variants;
  const [variantQuantity, setVariantQuantity] = useState(1);
  const [activeVariantId, setActiveVariantId] = useState(
    variantId || firstVariant.id
  );
  const { addItem } = useCart();

  const activeVariant = variants.find(
    variant => variant.id === activeVariantId
  );

  const firstVariantSelected = firstVariant === activeVariant;

  if (firstVariantSelected) navigate(`?variantId=${activeVariantId}`);

  const handleVariantChange = value => {
    setActiveVariantId(value);
    navigate(`?variantId=${value}`);
  };

  return (
    <React.Fragment>
      <div className="mb-6">
        <h1 className="font-bold text-6xl mb-3 text-slategray">
          {product.name}
        </h1>
        <hr className="border-b border-gainsboro w-10" />
      </div>
      <div className="md:flex -mx-4">
        <div className="mb-8 px-4 md:mb-0 md:w-2/5">
          <div className="cursor-pointer w-full overflow-hidden relative p-3 bg-gainsboro">
            <Img
              fluid={
                activeVariant
                  ? activeVariant.variantImage.childImageSharp.fluid
                  : product.printfulProduct.productImage.childImageSharp.fluid
              }
              alt={product.name}
              title={product.name}
            />
          </div>
        </div>
        <div className="px-4 md:w-3/5">
          <p className="font-semibold text-2xl">
            {activeVariant && activeVariant.formattedPrice}
          </p>
          {product.description && (
            <p className="leading-loose text-lightgray text-sm">
              {product.description.markdown}
            </p>
          )}
          <select
            defaultValue={activeVariantId}
            onChange={({ target: { value } }) => handleVariantChange(value)}
          >
            {variants.map((variant, index) => (
              <option key={index} value={variant.id}>
                {variant.splitName}
              </option>
            ))}
          </select>
          <div>
            <select
              className="mx-4 w-2/6"
              onChange={({ target: { value } }) => setVariantQuantity(value)}
            >
              {new Array(5)
                .fill(0)
                .map((v, k) => k + 1)
                .map(i => ({ value: i, label: i }))
                .map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </select>
            <button
              className={`bg-primary px-4 py-2 rounded text-white ${
                !activeVariant ? 'opacity-50' : 'opacity-100'
              }`}
              onClick={() =>
                addItem(
                  {
                    id: activeVariant.id,
                    price: activeVariant.retail_price,
                    name: activeVariant.name,
                    description: product.description.markdown,
                  },
                  variantQuantity
                )
              }
              disabled={!activeVariant}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query ProductQuery($id: ID!) {
    cms {
      product(where: { id: $id }) {
        description {
          markdown
        }
        name
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
            id
            formattedPrice
            name
            retail_price
            splitName
            variantImage {
              childImageSharp {
                fluid(maxWidth: 560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ProductPage;
