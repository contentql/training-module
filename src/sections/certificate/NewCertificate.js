import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const NewCertificate = ({ certificateData }) => {
  const certificatesUsername = JSON.parse(localStorage.getItem('user-data'));

  const formattedDate = certificateData?.attributes.createdAt
    ? new Date(certificateData.attributes.updatedAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
    : '';

  return (
    <div className="relative top-[calc(50%_-_397px)] left-[calc(50%_-_561.5px)] w-[1123px] h-[794px] text-left text-41xl text-black font-montaga">
      <div className="absolute top-[calc(50%_-_372px)] left-[calc(50%_-_536.5px)] rounded-21xl box-border w-[1073px] h-[744px] border-[2px] border-solid border-lightgray overflow-hidden">
        {/* <img
          src="https://certifier-production-amplify.s3.eu-west-1.amazonaws.com/public/565302e3-5bff-4e5c-8b76-a7f0246fcb4a%2Fcertificate-designs%2Fbackgrounds%2F04-08-22-7%3A08%3A57_Simple%20background.png"
          alt="Certificate Background"
          style={styles.backgroundImage}
        /> */}
        <img
          className="absolute top-[calc(50%_-_397px)] left-[calc(50%_-_561.5px)] w-[1123px] h-[794px]"
          alt=""
          src="/mask-group.svg"
        />
        <img src="/logo.svg" alt="Company Logo" style={styles.logo} />
        <h1 style={styles.title}>CERTIFICATE OF RECOGNITION</h1>
        <div style={styles.content}>
          <p>This certificate is presented to</p>
          <h2 style={styles.userName}>{certificatesUsername.state.newUserName}</h2>
          <p>for completing the course</p>
          <h3 style={styles.courseTitle}>{certificateData?.attributes.courseTitle}</h3>
          <p>
            by <span style={{ fontStyle: 'italic', fontWeight: '20px' }}>Ryzolve.</span>
          </p>
          {/* <p>
  by <span style={{ fontStyle: 'italic', fontWeight: '20px' }}>Ryzolve</span> for
</p> */}
          <p style={styles.content}>
            In recognition of outstanding dedication, exceptional performance, and unwavering
            commitment to excellence. Your contributions have made a significant impact, and we
            deeply appreciate your efforts.
          </p>
        </div>
        {/* <div style={styles.signature}>Signature</div>
<div style={styles.issueDate}>Issue Date: {formattedDate}</div> */}
        <div style={styles.issueDateContainer}>
          <div style={styles.issueDate}>{formattedDate}</div>
          <div style={styles.line} />
          <div style={styles.issueDateLabel}>Issue Date</div>
        </div>
        <div style={styles.signature}>Signature</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '1024px',
    height: '800px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    color: '#fff', // Text color on the certificate
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  courseTitle: {
    color: '#000',
    margin: '4px 0',
  },
  logo: {
    width: '200px',
    height: '50px',
    position: 'absolute',
    top: '40px',
    left: '430px',
    // marginBottom: '50px',
    // marginLeft: '250px',
  },
  title: {
    fontSize: '25px',
    fontFamily: 'Libre Baskerville',
    color: '#103754',
    textAlign: 'center',
    marginTop: '150px',
  },
  content: {
    fontSize: '20px',
    color: '#484848',
    lineHeight: '1.6',
    textAlign: 'center',
    marginTop: '10px',
    marginLeft: '40px',
    marginRight: '40px',
    fontFamily: 'Poppins',
  },
  userName: {
    color: '#103754',
    fontFamily: 'MonteCarlo sans-serif',
    fontSize: '40px',
    fontStyle: 'italic',
    textDecoration: 'underline',
    marginTop: '-5px',
    marginBottom: '-5px',
  },
  // signature: {
  //   position: 'absolute',
  //   bottom: '50px',
  //   left: '50px',
  //   fontSize: '18px',
  //   color: '#484848',
  // },
  // issueDate: {
  //   position: 'absolute',
  //   bottom: '50px',

  //   // bottom: 'px',
  //   // top: '500px',
  //   right: '50px',
  //   fontSize: '18px',
  //   color: '#484848',
  // },
  issueDateContainer: {
    position: 'absolute',
    bottom: '70px',
    right: '100px',
    display: 'flex',
    color: '#000',
    flexDirection: 'column',
    alignItems: 'center',
  },
  issueDate: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  line: {
    width: '100px',
    height: '2px',
    backgroundColor: '#000',
  },
  issueDateLabel: {
    fontSize: '18px',
  },
  signature: {
    position: 'absolute',
    bottom: '70px',
    left: '100px',
    color: '#000',
    fontSize: '18px',
  },
};

NewCertificate.propTypes = {
  certificateData: PropTypes.object,
};

export default NewCertificate;
