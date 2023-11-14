'use client';

import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import { getCourseData } from 'src/queries/course';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningCourseDetailsLessonsDialog from '../details/elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export default function ElearningLessonsView() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['course', 3],
    queryFn: () => getCourseData(3),
  });

  useEffect(() => {
    if (data) setSelectedLesson(data.attributes.units.data.at(0).attributes.lesson.at(0));
  }, [data]);

  if (isLoading) return <SplashScreen />;

  const handleSelectedLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  console.log('units: ', data);

  return (
    <ElearningCourseDetailsLessonsDialog
      units={data.attributes.units.data}
      selectedLesson={selectedLesson}
      onSelectedLesson={handleSelectedLesson}
    />
  );
}

ElearningLessonsView.propTypes = {};
