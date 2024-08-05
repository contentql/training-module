import fetchData from 'src/utils/fetchData';

export const getCertificateData = async (section) => {
  const data = await fetchData(
    `
        query{
            certificates{
                data{
                    attributes{
                        certificate{
                            name
                            signature{
                                data{
                                    attributes{
                                        url
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
      variables: {},
    }
  );

  return {
    cetificateNames: data.certificates.data[0].attributes.certificate,
  };
};
