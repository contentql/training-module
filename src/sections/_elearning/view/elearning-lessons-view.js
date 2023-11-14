'use client';

import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { getCourseData } from 'src/queries/course';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningCourseDetailsLessonsDialog from '../details/elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export default function ElearningLessonsView({ params }) {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['course', params.id],
    queryFn: () => getCourseData(params.id),
  });

  useEffect(() => {
    if (data)
      setSelectedLesson(
        data.attributes.units.data
          .find((unit) => unit.id.toString() === searchParams.get('unit'))
          .attributes.lesson.find((lesson) => lesson.id.toString() === searchParams.get('lesson'))
      );
  }, [data, searchParams]);

  const handleSelectedLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  console.log('data: ', data);

  if (isLoading) return <SplashScreen />;

  return (
    <ElearningCourseDetailsLessonsDialog
      units={data.attributes.units.data}
      selectedLesson={selectedLesson}
      onSelectedLesson={handleSelectedLesson}
    />
  );
}

ElearningLessonsView.propTypes = {
  params: PropTypes.object,
};
