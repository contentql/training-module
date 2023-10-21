import fetchData from 'src/utils/fetchData';

export const getCourseData = async (courseId) => {
  const data = await fetchData(
    `
        query ($courseId: ID!) {
            course(id: $courseId) {
                data{
                    id
                    attributes {
                        title
                        description
                        price
                        category
                        time
                        rating
                        units {
                            data {
                                id
                                attributes {
                                    title
                                    lesson {
                                        title
                                        subtitle
                                        time
                                        content
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    `,
    {
      variables: {
        courseId,
      },
    }
  );
  return data.data.course.data;
};
