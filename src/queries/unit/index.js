import fetchData from 'src/utils/fetchData';

export const getUnitData = async (unitId, lessonTitle) => {
  const data = await fetchData(
    `
        query ($unitId: ID!, $lessonTitle: String!) {
            unit(id: $unitId) {
                data {
                    id
                    attributes {
                        title
                        lesson (filters: { title: { eq: $lessonTitle } }){
                            id
                            title
                            subtitle
                            time
                            content
                        }
                    }
                }
            }
        }`,
    {
      variables: {
        unitId,
        lessonTitle,
      },
    }
  );

  return data.data.unit.data.attributes.lesson.find((l) => l.title.toString() === lessonTitle);
};
