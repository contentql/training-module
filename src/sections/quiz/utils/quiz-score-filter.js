export const coursesCertificatesFilter = (quizScore) => {
  const courseScores = {};

  quizScore.forEach((quizData) => {
    const { courseTitle, score } = quizData.attributes;

    const numericScore = Number(score);

    if (!courseScores[courseTitle] || numericScore > courseScores[courseTitle].numericScore) {
      courseScores[courseTitle] = {
        ...quizData,
        numericScore,
      };
    }
  });

  const completedCourses = Object.values(courseScores).filter(
    (quizData) => (quizData.attributes.score / 10) * 100 >= 70
  );

  return completedCourses;
};
