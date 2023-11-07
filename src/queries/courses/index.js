import fetchData from 'src/utils/fetchData';

export const getCoursesData = async () => {
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
                        users {
                            data {
                                id
                            }
                        }
                    }
                }
            }
        }
    `,
    {
      variables: {},
    }
  );
  return data.data.courses.data;
};
