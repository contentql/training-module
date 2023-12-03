import fetchData from 'src/utils/fetchData';

export const getOrdersData = async () => {
  const ordersData = [];

  const fetchPage = async (page, pageSize) => {
    const data = await fetchData(
      `
      query Orders($page: Int!, $pageSize: Int!) {
        orders(pagination: { page: $page, pageSize: $pageSize }) {
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
        variables: { page, pageSize },
      }
    );

    const pageData = data.data.orders.data;

    ordersData.push(...pageData);

    if (pageData.length === pageSize) {
      await fetchPage(page + 1, pageSize);
    }
  };

  const initialPage = 1;
  const pageSize = 10;

  await fetchPage(initialPage, pageSize);

  return ordersData;
};
