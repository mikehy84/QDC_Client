import { SetStateAction, useEffect, useState } from 'react'
import { PortItem } from '../portfolio/PortItem';
import { IMotion } from '../../shared/interfaces/IMotion';
import { TeamMember } from './TeamMember';
import { useDispatch } from 'react-redux'
import { useGetEmployeesQuery } from '../../Api/EmployeeApi';
import { IPortItem } from '../../shared/interfaces/IPortItem';
import { setEmployees } from '../../Redux/EmployeeSlice';






interface Props {
  motion: IMotion
};

export const Ourteam = ({ motion }: Props) => {

  const [imgUpload, setImgUpload] = useState<any>();
  const [imgPreview, setImgPreview] = useState<string>("");

  const dispatch = useDispatch();
  const { data, isLoading } = useGetEmployeesQuery(null);

  const [portItemLen, setportItemLen] = useState(0);
  let toBeShownItems: IPortItem[] = [];


  useEffect(() => {
    if (!isLoading) {
      dispatch(setEmployees(data.result));
      setportItemLen(toBeShownItems.length - (toBeShownItems.length));
    }
  }, [isLoading]);



  const handleNext = () => {
    setImgPreview("");
    if (portItemLen < toBeShownItems.length - 1) {
      setportItemLen((PrevLen) => PrevLen + 1);
    } else if (portItemLen === toBeShownItems.length - 1) {
      setportItemLen(0);
    }
  }

  const handlePrev = () => {
    setImgPreview("");
    if (portItemLen > 0) {
      setportItemLen((PrevLen) => PrevLen - 1);
    } else if (portItemLen === 0) {
      setportItemLen(toBeShownItems.length - 1);
    }
  }

  const handleDot = (evt: any) => {
    const value = evt.target.value;
    setportItemLen(value);
  };




if (isLoading) {
    return <h1>Data is loading...</h1>
  };

  data.result.forEach((item: IPortItem) => {
    if (item.isArchive === true) {
      toBeShownItems.push(item);
    }
  });


  return (
    <div className="team-box">
      <div>
        <p className="prev" onClick={handlePrev}> ❮ </p>
        <TeamMember teamMember={toBeShownItems[portItemLen]}
          imgUpload={imgUpload}
          setImgUpload={setImgUpload}
          imgPreview={imgPreview}
          setImgPreview={setImgPreview}
        />
        <p className="next" onClick={handleNext}> ❯ </p>
      </div>


      <div style={{ textAlign: "center", paddingBottom:'5px' }}>
        {toBeShownItems.map((member, index) => (
          <span
            key={member.id}
            className={index === portItemLen ? 'active' : 'dot'}
            onClick={() => setportItemLen(index)}
          >
          </span>
        ))}
      </div>
    </div>
  )
}
