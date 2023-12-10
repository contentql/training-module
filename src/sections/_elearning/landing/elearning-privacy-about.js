import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function ElearningPrivacy() {
  return (
    <Container
      sx={{
        py: { width: '71%', textAlign: 'center' },
        mb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, textAlign: 'center' }}>
        Privacy Policy
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        The company collects your name, email address, mailing address etc. so as to deliver the
        course details and mail the certificate. The company does not misuse or distribute or sell
        any client or student contact or other information for whatsoever reason other than to
        <br />
        <br />
        provide information and services to the client or student. The exception would be if the
        information must be provided to the government or third party for any reason related to laws
        of federal, state, local and other Government related authorities. Data with the company is
        secured but it would not be responsible for unlawful interception or stealing of information
        by third parties.
        <br />
        <br />
        Clients and students also need to periodically check for changes to our privacy policy as
        the company will not inform any client of any privacy policy changes other than make the
        changes on the website. By using this site, you consent to the collection and use of the
        information as described in this privacy statement.
      </Typography>
      <Typography variant="h2" sx={{ mb: 2, mt: { xs: 5, md: 10 }, textAlign: 'center' }}>
        Security
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        Security measures have been provided by this site to protect against loss, misuse of user
        information. Credit card information goes through secure socket layer (SSL) of paypal and is
        the best and safest way for online ecommerce transactions. The company does not have a
        policy of charging recurring charges to any client or student and does not store any credit
        card information for whatsoever purpose.
      </Typography>
    </Container>
  );
}
