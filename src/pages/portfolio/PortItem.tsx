import React, { SetStateAction, useState } from 'react'
import { IPortItem } from '../../shared/interfaces/IPortItem'
import img_1 from '../../../../QDC_API/wwwroot/images/portfolio/e1d5a08f-2b77-4224-9311-ac7384d3a9de.jpg'

interface Props {
  portItem: IPortItem,
  imgUpload: any,
  setImgUpload: React.Dispatch<any>,
  imgPreview: string,
  setImgPreview: React.Dispatch<SetStateAction<string>>
};



export const PortItem = ({ portItem, imgUpload, setImgUpload, imgPreview, setImgPreview }: Props) => {




  // ----------------------- handling load image here ----------------------- //
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImgTpyeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImgUpload("");
        console.log("File must be less than 1 MB", "error");
        return;
      }
      else if (isImgTpyeValid.length === 0) {
        setImgUpload("");
        console.log("File must be in jpeg, jpg, or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImgUpload(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImgPreview(imgUrl)
      }
    }
  }
  // ----------------------- ----------------------- ----------------------- //



  return (
    <div className='port-item'>
      <div>
        <h3>{portItem?.name}</h3>
        {/* <p>{portItem?.description}</p> */}
        <div dangerouslySetInnerHTML={{ __html: portItem?.description }} />
      </div>
      {/* <img src={!imgPreview ? `data:image/jpeg;base64,${portItem?.image}` : imgPreview} alt="" /> */}
      <img src={`data:image/jpeg;base64,${portItem?.image}`} alt="" />
    </div>
  )
}
