import fetchData from 'src/utils/fetchData';

export const getAboutUsData = async (section) => {
  const data = await fetchData(
    `
        query {
            trainingAboutUs{
                data{
                id
                attributes{
                    hero{
                        id
                        title
                        description_one
                        description_two
                    }
                    about{
                        id
                        title
                        subtitle
                        }
                    privacy{
                        id
                        title
                        description_one
                        description_two
                    }
                    security{
                        id
                        title
                        subtitle
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

  return {
    heroData: data.data.trainingAboutUs.data.attributes.hero,
    aboutData: data.data.trainingAboutUs.data.attributes.about,
    privacy: data.data.trainingAboutUs.data.attributes.privacy,
    security: data.data.trainingAboutUs.data.attributes.security,
  };
};
