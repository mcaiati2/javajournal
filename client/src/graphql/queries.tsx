import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      user {
        _id
        username
      }
    }
  }
`;

export const GET_ALL_COFFEES = gql`
  query GetAllCoffees {
    getAllCoffees {
      _id
      body
      title
      flavor
      shop {
        name
      }
    }
  }
`;

export const GET_USER_SHOPS = gql`
  query GetUserShops {
    getUserShops {
      _id
      rating
      name
      location
      coffees {
        _id
      }
    }
  }
`;

export const GET_COFFEES_FOR_SHOP = gql`
  query GetCoffeesForShop($shopId: ID) {
    getCoffeesForShop(shop_id: $shopId) {
      _id
      body
      title
      flavor
    }
  }
`;

// TODO - line 48 correct ?