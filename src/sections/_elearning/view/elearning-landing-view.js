'use client';

import { useQuery } from 'react-query';

import { _testimonials } from 'src/_mock';
import { getCoursesData } from 'src/queries/courses';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningLandingFaqs from '../landing/elearning-landing-faqs';
import ElearningLandingHero from '../landing/elearning-landing-hero';
import ElearningLandingAbout from '../landing/elearning-landing-about';
import ElearningTestimonial from '../testimonial/elearning-testimonial';
import ElearningLandingSummary from '../landing/elearning-landing-summary';
import ElearningLandingIntroduce from '../landing/elearning-landing-introduce';
// import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';
import ElearningLandingFeaturedCourses from '../landing/elearning-landing-featured-courses';

import ElearningLandingProcess from './elearning-landing-process';
import ElearningLandingServices from './elearning-landing-services';

// ----------------------------------------------------------------------

export default function ElearningLandingView() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ['courses'],
  //   queryFn: getCoursesData,
  // });

  // // console.log('landingData', data);

  // if (isLoading) return <SplashScreen />;

  return (
    <>
      <ElearningLandingHero />

      {/* <ElearningLandingAbout /> */}

      {/* <ElearningLandingIntroduce /> */}
      <ElearningLandingServices />

      <ElearningLandingProcess />

      {/* <ElearningLandingSummary /> */}

      <ElearningLandingFeaturedCourses />

      <ElearningTestimonial testimonials={_testimonials} />

      <ElearningLandingFaqs />

      {/* <ElearningLatestPosts posts={_coursePosts.slice(0, 4)} /> */}

      <ElearningNewsletter />
    </>
  );
}
