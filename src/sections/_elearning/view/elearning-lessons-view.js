'use client';

import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { getCourseData } from 'src/queries/course';
import { useUserStore } from 'src/states/auth-store';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningCourseDetailsLessonsDialog from '../details/elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export default function ElearningLessonsView({ params }) {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['course', params.id],
    queryFn: () => getCourseData(params.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data)
      setSelectedLesson(
        data.attributes.units.data
          .find((unit) => unit.id.toString() === searchParams.get('unit'))
          .attributes.lesson.find((lesson) => lesson.id.toString() === searchParams.get('lesson'))
      );
  }, [data, searchParams]);

  const userData = useUserStore((state) => state.UserData);

  const { isLoggedIn } = userData;

  const hasBoughtCourse =
    isLoggedIn &&
    data?.attributes.users.data.filter((user) => user.id === userData.id.toString()).length > 0;

  const handleSelectedLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  if (isLoading) return <SplashScreen />;

  return (
    <ElearningCourseDetailsLessonsDialog
      units={data.attributes.units.data}
      selectedLesson={selectedLesson}
      onSelectedLesson={handleSelectedLesson}
      hasBoughtCourse={hasBoughtCourse}
    />
  );
}

ElearningLessonsView.propTypes = {
  params: PropTypes.object,
};
