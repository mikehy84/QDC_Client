import img_1 from '../../shared/style/images/contact/contact.jpg'
import { IMotion } from '../../shared/interfaces/IMotion';
import { Link } from 'react-router-dom';

interface Props {
  motion: IMotion
};

export const Contact = ({ motion }: Props) => {

  return (
    <div className="contact-page">
      <div className='contact-box'>
        <img src={img_1} alt="" />
        <h3>Please contact us any time between 8AM and 5PM PST, Monday to Friday.</h3>
        <br />
        <h3>Quality Drafting Company (QDC)</h3>
        <br />
        <p>Suite 219
          <br />
          198 East, Island Highway
          <br />
          PO Box 1958
          <br />
          <Link target='_blank' to="https://parksvilledowntown.ca/">Parksville,</Link> BC, Canada
          <br />
          V9P 2H7
        </p>

        <br />
        <div>
            <Link to="tel:+1250586-1914">Phone: (250)586-1914</Link>
            <Link to="mailto:general@qualitydraftingco.com">Email: general@qualitydraftingco.com</Link>
        </div>
      </div>
    </div>
  )
}
