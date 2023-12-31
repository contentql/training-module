import fetchData from 'src/utils/fetchData';

export const getCourseData = async (courseId) => {
  const data = await fetchData(
    `
        query ($courseId: ID!) {
            course(id: $courseId) {
                data{
                    id
                    attributes {
                        title
                        description
                        price
                        category
                        time
                        rating
                        units {
                            data {
                                id
                                attributes {
                                    title
                                    lesson (pagination: {limit: 100}){
                                        id
                                        title
                                    }
                                    quiz {
                                        title
                                        correctAnswer
                                        description
                                        options {
                                        options
                                        }
                                    }
                                }
                            }
                        }
                        quiz {
                                title
                                correctAnswer
                                description
                                options {
                                  options
                                }
                        }
                        WhatYouWillLearn {
                            id
                            points
                        }
                        Skills {
                            id
                            points
                        }
                        users {
                            data {
                                id
                            }
                        }
                    }
                }
            }
        }

    `,
    {
      variables: {
        courseId,
      },
    }
  );

  return data.data.course.data;
};
