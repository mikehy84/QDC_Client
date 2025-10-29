import { SetStateAction, useEffect, useState } from 'react'
import img_1 from '../../shared/style/images/about/about_1.png'
import { PortItem } from '../portfolio/PortItem';
import { IMotion } from '../../shared/interfaces/IMotion';
import { motion as m } from "framer-motion";

interface Props {
  motion: IMotion
};

export const About = ({ motion }: Props) => {






  return (
    <div
      className="about-page"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ ease: "easeOut", duration: 1 }}
      // animate={{ rotate: 360, opacity: 1 }}
      // transformTemplate={
      //   () => `rotate(${360}deg) translateX(${0}px)`
      // }
    >
      <div className='about-box'>
        <img src={img_1} alt="" />
        <h3>Quality Drafting Co. provides structural drafting services to fabricators, engineers, general contractors, architects and developers.</h3>
        <br />
        <div>

          <p>Utilizing TEKLA Structures software, the accomplished staff at Quality Drafting Company
            (QDC) is dedicated to producing accurate shop drawings promptly.
            Each and every project is treated with the utmost importance,
            and we believe that understanding our client’s needs is key to the success of their
            project and in building a long term business relationship.</p>

          <br />
          <p>QDC staff has the experience to effectively deal with omissions and errors that are often found in
            contract drawings and will propose solutions to speed up the Request for Information (RFI) process.
            Through TEKLA Structures we can provide 3d views of problem areas to expedite a cost effective resolution.</p>

          <br />
          <p>Our Project Managers realize that tracking emails and RFI’s is an essential part of the design life cycle of any steel project.
            They excel at pushing a schedule and keeping project documentation orderly and accessible not only for
            our project team's reference and use but for our clients also.</p>

        </div>
      </div>
    </div>
  )
}
