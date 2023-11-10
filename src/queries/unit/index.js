import fetchData from 'src/utils/fetchData';

export const getUnitData = async (unitId) => {
  const data = await fetchData(
    `
        query {
             units {
                data {
                    id
                    attributes {
                        title
                        lesson {
                            id
                            title
                            subtitle
                            time
                            content
                        }
                    }
                }
            }
        }

    `,
    {
      variables: {
      },
    }
  );
  return data;
};
