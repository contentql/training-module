'use client';

import { _courses, _coursePosts, _testimonials } from 'src/_mock';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningLandingHero from '../landing/elearning-landing-hero';
import ElearningTestimonial from '../testimonial/elearning-testimonial';
import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';
import ElearningLandingFeaturedCourses from '../landing/elearning-landing-featured-courses';

// ----------------------------------------------------------------------

export default function ElearningLandingView() {
  return (
    <>
      <ElearningLandingHero />

      <ElearningLandingFeaturedCourses courses={_courses} />

      <ElearningTestimonial testimonials={_testimonials} />

      <ElearningLatestPosts posts={_coursePosts.slice(0, 4)} />

      <ElearningNewsletter />
    </>
  );
}
