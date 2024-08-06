import PropTypes from 'prop-types';

const Certificate = ({ certificateData, certificateNames }) => {
  const formattedDate = certificateData?.attributes.createdAt
    ? new Date(certificateData.attributes.updatedAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
    : '';

  console.log('certificateNames', certificateNames);
  return (
    <div className="relative top-[calc(50%_-_397px)] left-[calc(50%_-_561.5px)] w-[1123px] h-[794px] text-26xl text-black font-montaga items-center text-center mx-auto">
      <div className="absolute top-[calc(50%_-_372px)] left-[calc(50%_-_536.5px)] rounded-21xl box-border w-[1073px] h-[744px] border-[2px] border-solid border-lightgray overflow-hidden">
        <img
          className="absolute top-[calc(50%_-_397px)] left-[calc(50%_-_561.5px)] w-[1123px] h-[794px]"
          alt=""
          src="/mask-group.svg"
        />
        {/* <div className="absolute top-[calc(50%_-_397px)] left-[calc(50%_-_439.5px)] items-center text-center"> */}
        <div className="flex flex-col text-center items-start justify-start pt-[38px] px-0 pb-0 gap-[75px]">
          <div className="flex flex-col items-start justify-start gap-[18px]">
            <img className="relative w-44 h-[35px]" alt="" src="/ryzolve-logo1.svg" />
            <div className="flex flex-col items-start justify-start gap-[14px]">
              <div className="relative capitalize leading-[120%] inline-block w-[800px]">
                <p className="m-0">CERTIFICATE OF RECOGNITION</p>
              </div>
              <div className="relative text-base leading-[135%] font-medium font-montserrat text-dimgray">
                This certificate is presented to
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[17px] text-26xl text-darkslateblue font-montserrat">
              <div className="relative font-semibold">{certificateData?.attributes.username}</div>
              <div className="relative text-base leading-[135%] font-medium text-dimgray inline-block w-[461px]">
                The holder of this certficate has completed the required sequence of unit under 26
                TAC 558.259d Part of the initial 24 hr.in.26.259(b) ,{' '}
                {certificateData?.attributes.courseTitle}. This certficate is granted by Ryzolve
              </div>
            </div>
          </div>
          <div className="flex flex-row items-end justify-start gap-[100px] text-base text-darkslategray font-montserrat">
            <div className="flex flex-col items-start justify-start gap-[14px]">
              <img
                className="relative w-[72px] h-[73px]"
                alt="signature"
                src={certificateNames[0]?.signature.data.attributes.url}
              />
              <img className="relative w-[117px] h-px" alt="" src="/vector-10.svg" />
              <div className="flex flex-col items-start justify-start gap-[4px]">
                <div className="relative leading-[135%] font-semibold">
                  {certificateNames[0]?.name}
                </div>
                <div className="relative text-mini leading-[135%] font-medium text-dimgray inline-block w-[122px]">
                  {certificateNames[0]?.designation}
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col items-start justify-start gap-[14px]">
                <img
                  className="relative w-[72px] h-[73px]"
                  alt=""
                  src={certificateNames[1]?.signature.data.attributes.url}
                />
                <img className="relative w-[117px] h-px" alt="" src="/vector-10.svg" />
                <div className="flex flex-col items-start justify-start gap-[4px]">
                  <div className="relative leading-[135%] font-semibold">
                    {certificateNames[1]?.name}
                  </div>
                  <div className="relative text-mini leading-[135%] font-medium text-dimgray inline-block w-[165px]">
                    {certificateNames[1]?.designation}
                  </div>
                </div>
              </div> */}
            <div className="flex flex-col items-start justify-start gap-[4px]">
              <div className="relative leading-[135%] font-semibold">{formattedDate}</div>
              <div className="relative text-mini leading-[135%] font-medium text-dimgray">
                Issuing date
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

Certificate.propTypes = {
  certificateData: PropTypes.object,
  certificateNames: PropTypes.any,
};

export default Certificate;
