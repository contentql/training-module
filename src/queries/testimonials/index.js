import fetchData from 'src/utils/fetchData';

export const getTestimonialData = async () => {
  const data = await fetchData(
    `
        query  {
            reviews(filters: { source: { eq: "training" }}){
                data{
                attributes{
                    name
                    review
                    designation
                    company 
                    display
                }
            }
        }
    }

    `,
    {
      variables: {},
    }
  );

  return data.data.reviews.data.filter((list) => list.attributes.display);
};
