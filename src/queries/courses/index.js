import fetchData from 'src/utils/fetchData';

export const getCoursesData = async () => {
  const data = await fetchData(
    `
        query {
            courses(sort: "id") {
                data {
                    id
                    attributes {
                        title
                        description
                        price
                        category {
                            data {
                                attributes {
                                    name
                                }
                            }
                        }
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
