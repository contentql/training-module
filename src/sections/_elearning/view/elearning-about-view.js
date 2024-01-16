'use client';

import { useQuery } from 'react-query';

import { getAboutUsData } from 'src/queries/aboutUs/index';
import { _members, _coursePosts, _brandsColor, _testimonials } from 'src/_mock';

import ElearningAbout from '../about/elearning-about';
import ElearningNewsletter from '../elearning-newsletter';
import ElearningOurClients from '../elearning-our-clients';
import TeamElearningAbout from '../team/elearning-team-about';
import ElearningAboutHero from '../about/elearning-about-hero';
import ElearningPrivacy from '../landing/elearning-privacy-about';
import ElearningLandingAbout from '../landing/elearning-landing-about';
import ElearningTestimonial from '../testimonial/elearning-testimonial';
import ElearningAboutCoreValues from '../about/elearning-about-core-values';
import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';

// ----------------------------------------------------------------------

export default function ElearningAboutView() {
  const { data: aboutUsData, isLoading } = useQuery(['aboutUsData'], () => getAboutUsData());

  return (
    <>
      <ElearningAboutHero {...aboutUsData?.heroData} />
      <ElearningLandingAbout {...aboutUsData?.aboutData} />
      <ElearningPrivacy privacyData={aboutUsData?.privacy} securityData={aboutUsData?.security} />

      {/* <ElearningAbout /> */}

      {/* <ElearningAboutCoreValues /> */}

      {/* <TeamElearningAbout members={_members} /> */}

      {/* <ElearningOurClients brands={_brandsColor} /> */}

      <ElearningTestimonial testimonials={_testimonials} />

      {/* <ElearningLatestPosts posts={_coursePosts.slice(0, 4)} /> */}

      <ElearningNewsletter />
    </>
  );
}
