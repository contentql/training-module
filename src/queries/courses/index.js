import fetchData from 'src/utils/fetchData';

export const getCoursesData = async () => {
  try {
    const data = await fetchData(
      `
        query {
            courses {
                data {
                    id
                    attributes {
                        title
                        description
                        price
                        category
                        time
                        rating
                    }
                }
            }
        }
    `,
      {
        variables: {},
      }
    );

    return data.data;
  } catch (err) {
    console.log(err.message);
  }
  return null;
};
