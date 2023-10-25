'use client';

// eslint-disable-next-line import/no-extraneous-dependencies

import { _courses } from 'src/_mock';

import ElearningLandingFeaturedCourses from './mylearning';

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersPage() {
  return <ElearningLandingFeaturedCourses courses={_courses} />;
}
