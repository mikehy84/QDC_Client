import img_1 from '../../shared/style/images/service/service_1.jpg'
import { IMotion } from '../../shared/interfaces/IMotion';

interface Props {
  motion: IMotion
};

export const Service = ({ motion }: Props) => {

  return (
    <div className="service-page">
      <div className='service-box'>
        <img src={img_1} alt="" />
        <h3>Quality Drafting Company (QDC) provides structural steel detailing services utilizing the latest version of Tekla Structures.
          <br />
          We work directly with fabricators to fulfill their shop drawing needs.</h3>
        <br />
          <p>QDC also has the expertise to work with owners, engineers and architects early in the design process to pre-detail the structure.
            This can eliminate much of the delays caused by RFI's and allow for a mill order list to be ready at the bid phase of a project.
            We can import existing 3D design models to speed up the detailing process or to use for clash checking.</p>

          <br />
          <p>For fabricators that have their own in house detailing teams we may provide drawing editing services.
            After downloading the clients existing model we will complete the detailing by editing the shop drawings and produce erection plans.</p>
        <div>
            <div>
              <br />
              <h3>Deliverables:</h3>
              <ul>
                <li>3D structural steel model (DWG, IFC)</li>
                <li>Shop drawings in pdf or dwg format</li>
                <li>Erection plans</li>
                <li>Bolt lists</li>
                <li>Mill order list</li>
                <li>Load lists</li>
                <li>CNC files / DXF files</li>
                <li>BIM coordination</li>
                <li>Fabtrol lists</li>
                <li>Field work drawings</li>
                <li>On-site field work drawings or generation of as built drawings</li>
              </ul>
            </div>
            <div>
              <br />
              <h3>Software:</h3>
              <ul>
                <li>Tekla</li>
                <li>BlueBeam</li>
                <li>DWG TrueView</li>
                <li>BricsCAD</li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  )
}
