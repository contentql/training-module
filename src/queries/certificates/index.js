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

  return data.certificates.data.map((item) => item.attributes.certificate);
};
