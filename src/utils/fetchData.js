// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const graphQLEndpoint = process.env.NEXT_PUBLIC_GRAPHQL;

const fetchData = async (query, { variables = {} }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios({
      url: graphQLEndpoint,
      method: 'POST',
      headers,
      data: { query, variables },
    });

    return await data;
  } catch (error) {
    console.log('error', error);
    throw new Error();
  }
};

export default fetchData;
