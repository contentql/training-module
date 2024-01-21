import fetchData from 'src/utils/fetchData';

export const getTestimonialData = async () => {
  const data = await fetchData(
    `
        query  {
            reviews(filters: { source: { eq: "training" }}){
                data{
                attributes{
                    id
                    name
                    review
                    designation
                    company
                    
                }
            }
        }
    }

    `,
    {
      variables: {},
    }
  );

  return data.data.reviews.data;
};
