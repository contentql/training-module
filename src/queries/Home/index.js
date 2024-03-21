import fetchData from 'src/utils/fetchData';

export const getHeroData = async () => {
  const data = await fetchData(
    `
    query{
        trainingHero{
          data{
            attributes{
              title
              description
              whyChooseOurExams{
                name
                description
                link
              }
              whyTexasChooseUs{
                description
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

  return data.data.trainingHero.data.attributes;
};
