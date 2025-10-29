import { useEffect, useState } from 'react'
import { IMotion } from '../../shared/interfaces/IMotion';
import { PortItem } from './PortItem';
import { useGetPortfoliosQuery } from '../../Api/PortfolioApi';
import { useDispatch } from 'react-redux';
import { setPortfolios } from '../../Redux/PortfolioSlice';
import { IPortItem } from '../../shared/interfaces/IPortItem';







interface Props {
  motion: IMotion
};

export const Portfolio = ({ motion }: Props) => {

  const [imgUpload, setImgUpload] = useState<any>();
  const [imgPreview, setImgPreview] = useState<string>("");

  const dispatch = useDispatch();
  const { data, isLoading } = useGetPortfoliosQuery(null);

  let toBeShownItems: IPortItem[] = [];
  const [portItemLen, setportItemLen] = useState(0);


  useEffect(() => {
    if (!isLoading) {
      dispatch(setPortfolios(data.result));
      setportItemLen(toBeShownItems.length - 1 );
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
    <div className="portfolio">
      <div>
        <p className="prev" onClick={handlePrev}> ❮ </p>

        <PortItem portItem={toBeShownItems[portItemLen]}
          imgUpload={imgUpload}
          setImgUpload={setImgUpload}
          imgPreview={imgPreview}
          setImgPreview={setImgPreview}
        />

        <p className="next" onClick={handleNext}> ❯ </p>
      </div>


      <div style={{ textAlign: "center", paddingBottom: '5px' }}>
        {toBeShownItems.map((item: IPortItem, index: number) => (
          <span
            key={item.id}
            className={index === portItemLen ? 'active' : 'dot'}
            onClick={() => setportItemLen(index)}
          >
          </span>
        ))}
      </div>
    </div>
  )
}
