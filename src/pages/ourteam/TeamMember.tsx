import { SetStateAction } from "react"
import { IPortItem } from "../../shared/interfaces/IPortItem"


interface Props {
  teamMember: IPortItem,
  imgUpload: any,
  setImgUpload: React.Dispatch<any>,
  imgPreview: string,
  setImgPreview: React.Dispatch<SetStateAction<string>>
};


export const TeamMember = ({teamMember}:Props) => {
  return (
    <div className='team-member'>
      <div>
        <h3>{teamMember.name}</h3>
        <h4>{teamMember.job}</h4>
      </div>
      <div>
        <img src={`data:image/jpeg;base64,${teamMember?.image}`} alt="" />
        {/* <p>{teamMember.description}</p> */}

        {/* converting text eitor content which has been saved as text in DB */}
        <div dangerouslySetInnerHTML={{ __html: teamMember.description }} />
      </div>
    </div>
  )
}
