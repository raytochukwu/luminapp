import { gql } from "@apollo/client";

export const getProduct = gql`
  query getProducts($currency: Currency = USD) {
    products {
      id
      title
      image_url
      price(currency: $currency)
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
  }
`;

export const getCurrency = gql`
  query getCurrencies {
    currency
  }
`;