import Quiz from 'src/sections/quiz/';
import { _questions } from 'src/_mock';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Quiz: Course Validation',
};

export default function FormValidationPage() {
  return <Quiz _questions={_questions} />;
}
