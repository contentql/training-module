import fetchData from 'src/utils/fetchData';

export const getCategoriesData = async () => {
  const data = await fetchData(
    `
        query {
            categories {
                data {
                    id
                    attributes {
                        name
                    }
                }
            }
        }
    `,
    {
      variables: {},
    }
  );

  return data.data.categories.data;
};
