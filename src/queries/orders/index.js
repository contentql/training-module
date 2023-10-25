import fetchData from 'src/utils/fetchData';

export const getOrdersData = async () => {
  const data = await fetchData(
    `
    query {
        orders {
            data {
                id
                attributes {
                    stripeSessionToken
                    username
                    products
                    createdAt
                }
            }
        }
    }`,
    {
      variables: {},
    }
  );

  return data.data.orders.data;
};
