import fetchData from 'src/utils/fetchData';

export const getUnitData = async (unitId) => {
  const data = await fetchData(
    `
        query ($unitId: ID!) {
            unit(id: $unitId) {
                data {
                    id
                    attributes {
                        title
                        lesson {
                            id
                            title
                            subtitle
                            time
                            content
                            lessonContent
                        }
                    }
                }
            }
        }`,
    {
      variables: {
        unitId,
      },
    }
  );

  return data.data.unit.data;
};
