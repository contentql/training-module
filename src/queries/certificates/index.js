import fetchData from 'src/utils/fetchData';

export const getCertificateData = async () => {
  const data = await fetchData(
    `
query {
	certificates{
    data{
      attributes{
        certificate{
          name
          designation
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
  console.log('Fetched Data:', data);

  return data;
};
