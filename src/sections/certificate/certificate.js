import PropTypes from 'prop-types';

const Certificate = ({ certificateData }) => (
  <div className="relative top-[calc(50%_-_397px)] left-[calc(50%_-_561.5px)] w-[1123px] h-[794px] text-left text-41xl text-black font-montaga">
    <div className="absolute top-[calc(50%_-_372px)] left-[calc(50%_-_536.5px)] rounded-21xl box-border w-[1073px] h-[744px] border-[2px] border-solid border-lightgray" />
    <img
      className="absolute top-[calc(50%_-_397px)] left-[calc(50%_-_561.5px)] w-[1123px] h-[794px]"
      alt=""
      src="/mask-group.svg"
    />
    <div className="absolute top-[calc(50%_-_397px)] left-[calc(50%_-_439.5px)] flex flex-row items-center justify-start gap-[83px]">
      <div className="flex flex-col items-start justify-start pt-[38px] px-0 pb-0 gap-[75px]">
        <div className="flex flex-col items-start justify-start gap-[18px]">
          <img className="relative w-44 h-[35px]" alt="" src="/ryzolve-logo1.svg" />
          <div className="flex flex-col items-start justify-start gap-[14px]">
            <div className="relative leading-[120%] capitalize inline-block w-[511px]">
              <p className="m-0">Certificate</p>
              <p className="m-0">of Completion</p>
            </div>
            <div className="relative text-mini leading-[135%] font-medium font-montserrat text-dimgray">
              This course completion certificate is proudly awarded to
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[17px] text-26xl text-darkslateblue font-montserrat">
            <div className="relative font-semibold">{certificateData?.attributes.username}</div>
            <div className="relative text-mini leading-[135%] font-medium text-dimgray inline-block w-[461px]">
              For his/her completion of the course <b>{certificateData?.attributes.courseTitle}</b>{' '}
              at Ryzolve from July to December 2023.
            </div>
          </div>
        </div>
        <div className="flex flex-row items-end justify-start gap-[71px] text-base text-darkslategray font-montserrat">
          <div className="flex flex-col items-start justify-start gap-[14px]">
            <img className="relative w-[72px] h-[73px]" alt="" src="/vector-14.svg" />
            <img className="relative w-[117px] h-px" alt="" src="/vector-10.svg" />
            <div className="flex flex-col items-start justify-start gap-[4px]">
              <div className="relative leading-[135%] font-semibold">Tunzi</div>
              <div className="relative text-mini leading-[135%] font-medium text-dimgray inline-block w-[122px]">
                CEO
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[14px]">
            <img className="relative w-[72px] h-[73px]" alt="" src="/vector-14.svg" />
            <img className="relative w-[117px] h-px" alt="" src="/vector-10.svg" />
            <div className="flex flex-col items-start justify-start gap-[4px]">
              <div className="relative leading-[135%] font-semibold">Amar</div>
              <div className="relative text-mini leading-[135%] font-medium text-dimgray inline-block w-[165px]">
                Programme Manager
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[4px]">
            <div className="relative leading-[135%] font-semibold">06.12.2023</div>
            <div className="relative text-mini leading-[135%] font-medium text-dimgray">
              Issuing date
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-[60px] text-center text-[25.71px] text-white font-montserrat">
        <div className="rounded-t-none rounded-b-xl bg-coral flex flex-col items-center justify-start pt-[174px] px-[65px] pb-[106px] gap-[167px]">
          <div className="relative leading-[120%] uppercase font-semibold">
            <p className="m-0">Verified</p>
            <p className="m-0">CERTIFicate</p>
          </div>
          <img className="relative w-[165.6px] h-[123.8px]" alt="" src="/mask-group1.svg" />
        </div>
        <a className="[text-decoration:none] relative w-[227px] h-10 text-sm text-black">
          <div className="absolute top-[0px] left-[0px] w-[227px] h-10">
            <a className="[text-decoration:none] absolute top-[23px] left-[0px] font-medium text-[inherit]">
              contentql.com/verify/DGF683DJ
            </a>
            <div className="absolute top-[0px] left-[83px] font-semibold">{`Verify at `}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
);

Certificate.propTypes = {
  certificateData: PropTypes.object,
};

export default Certificate;
