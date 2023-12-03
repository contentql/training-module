import fetchData from 'src/utils/fetchData';

export const getCourseInfo = async (courseId) => {
  const data = await fetchData(
    `
        query ($courseId: ID!) {
            course(id: $courseId) {
                data{
                    id
                    attributes {
                        title
                        price
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
