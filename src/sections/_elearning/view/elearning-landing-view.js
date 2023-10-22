'use client';

import { useQuery } from 'react-query';

import { _courses, _testimonials } from 'src/_mock';
import { getCoursesData } from 'src/queries/courses';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningLandingHero from '../landing/elearning-landing-hero';
import ElearningTestimonial from '../testimonial/elearning-testimonial';
// import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';
import ElearningLandingFeaturedCourses from '../landing/elearning-landing-featured-courses';

// ----------------------------------------------------------------------

export default function ElearningLandingView() {
  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesData,
  });

  console.log('landingData', data);

  if (isLoading) return <SplashScreen />;

  return (
    <>
      <ElearningLandingHero />

      <ElearningLandingFeaturedCourses courses={data} />

      <ElearningTestimonial testimonials={_testimonials} />

      {/* <ElearningLatestPosts posts={_coursePosts.slice(0, 4)} /> */}

      <ElearningNewsletter />
    </>
  );
}
