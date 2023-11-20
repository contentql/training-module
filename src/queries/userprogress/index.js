import fetchData from 'src/utils/fetchData';

export const getUserProgress = async () => {
  const data = await fetchData(
    `query {
        metadatas{
          data{
            id
            attributes{
              users{
                data{
                  attributes{
                    email
                  }
                }
              }
            }
          }
        }
      }`
    // {
    //   variables: {
    //     courseId,
    //   },
    // }
  );

  return data;
};
