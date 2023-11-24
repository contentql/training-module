import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

// import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import NumberDone from 'src/components/NumberDone';
import { RouterLink } from 'src/routes/components';
// import { useUserStore } from 'src/states/auth-store';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonItem({
  lesson,
  expanded,
  index,
  // selected,
  // onSelected,
  onExpanded,
  hasBoughtCourse,
  unitId,
}) {
  // const playIcon = selected ? 'carbon:pause-outline' : 'carbon:play';
  lesson.unLocked = true;

  // const { UserData } = useUserStore();

  const [lessonComplete] = useState(false);
  // const [progress, setProgress] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    if (!hasBoughtCourse) {
      toast.error('Please buy the course to view the content', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      onExpanded();
    }
  };
  // const userToken = localStorage.getItem('token');

  // const getUserProgress = async () => {
  //   try {
  //     const res = await fetch('http://localhost:1337/api/metadatas', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     const data = await res.json();
  //     setProgress(data);
  //     // console.log({ data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const addingLessonToUser = async () => {
  //   const requestBody = {
  //     data: {
  //       data: [
  //         {
  //           LessonTitle: lesson.id,
  //         },
  //       ],
  //     },
  //   };
  //   try {
  //     const res = await fetch(`http://localhost:1337/api/matadatas/${UserData.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const addingUserProgress = async () => {
  //   const requestBody = {
  //     data: {
  //       users: {
  //         connect: [UserData.id],
  //       },
  //       data: [
  //         {
  //           LessonTitle: lesson.id,
  //         },
  //       ],
  //     },
  //   };
  //   try {
  //     await fetch('http://localhost:1337/api/metadatas', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Accordion
      expanded={hasBoughtCourse && expanded}
      onChange={handleChange}
      disabled={!lesson.unLocked}
      sx={{
        [`&.${accordionClasses.expanded}`]: {
          borderRadius: 0,
        },
      }}
    >
      <AccordionSummary
        sx={{
          pr: 1,
          pl: 2,
          minHeight: 64,
          [`& .${accordionSummaryClasses.content}`]: {
            p: 0,
            m: 0,
          },
          [`&.${accordionSummaryClasses.expanded}`]: {
            bgcolor: 'action.selected',
          },
        }}
      >
        {lesson.unLocked ? (
          <NumberDone index={index} lessonComplete={lessonComplete} />
        ) : (
          <img src="/icons/lock.svg" alt="lesson" />
        )}
        {hasBoughtCourse ? (
          <Link
            component={RouterLink}
            href={`lessons/?unit=${unitId}&lesson=${lesson.id}`}
            color="inherit"
            sx={{
              pl: 2,
              flexGrow: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                flexGrow: 1,
              }}
              // onClick={() => getUserProgress()}
            >
              {lesson.title}
            </Typography>
          </Link>
        ) : (
          <Typography
            variant="subtitle1"
            sx={{
              pl: 2,
              flexGrow: 1,
            }}
          >
            {lesson.title}
          </Typography>
        )}
        <Typography variant="body2">{lesson.time} minutes</Typography>
        <Iconify icon={expanded ? 'carbon:chevron-down' : 'carbon:chevron-right'} sx={{ ml: 2 }} />
      </AccordionSummary>

      <AccordionDetails
        sx={{
          p: 2,
          typography: 'body',
          color: 'text.secondary',
        }}
      >
        {lesson.subtitle}
      </AccordionDetails>
    </Accordion>
  );
}

ElearningCourseDetailsLessonItem.propTypes = {
  expanded: PropTypes.bool,
  lesson: PropTypes.object,
  index: PropTypes.any,
  onExpanded: PropTypes.func,
  // onSelected: PropTypes.func,
  // selected: PropTypes.bool,
  hasBoughtCourse: PropTypes.bool,
  unitId: PropTypes.string,
};
