import React, { useEffect } from 'react'
import { IPortItem } from '../../../shared/interfaces/IPortItem'
import AdTypItem from './AdTypItem'
import { useDispatch, useSelector } from 'react-redux';
import { AdTypNew } from './AdTypNew';
import { MainLoader } from '../../../shared/components/MainLoader/MainLoader';
import { useOutletContext } from "react-router-dom";
import { RootState } from '../../../Redux/Store';
import { useGetPortfoliosQuery } from '../../../Api/PortfolioApi';
import { setPortfolios } from '../../../Redux/PortfolioSlice';


export const AdPortfolioPage = () => {

  const [updateObj, createObj, deleteObj,
    showNew, setShowNew, handleShowNew,
    objFromForm, setObjFromForm,
    adminPageId, setAdminPageId] = useOutletContext<[
      updateObj: any,
      createObj: any,
      deleteObj: any,
      showNew: boolean,
      setShowNew: React.Dispatch<React.SetStateAction<boolean>>,
      handleShowNew: () => void,
      objFromForm: IPortItem,
      setObjFromForm: React.Dispatch<React.SetStateAction<IPortItem>>,
      adminPageId: number,
      setAdminPageId: React.Dispatch<React.SetStateAction<number>>
    ]>();

  const dispatch = useDispatch();
  const { data, isLoading } = useGetPortfoliosQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setPortfolios(data.result));
    }
    setAdminPageId(0);
  }, [isLoading]);




  // const dataFromApi = useSelector((state: RootState) => state.portfolioStore);

  if (isLoading) {
    return <MainLoader />
  };

  return (
    <div className='typ-list'>
      {showNew ? (
        <AdTypNew key={-1} showNew={showNew} handleShowNew={handleShowNew} />
      ) : (

        <AdTypItem key={-1}
          objFromDb={objFromForm}
          handleShowNew={handleShowNew}
          adminPageId={adminPageId}
          updateObj={updateObj}
          createObj={createObj}
          deleteObj={deleteObj}
        />
      )}

      {data.result.map((item: IPortItem) => (
        <AdTypItem
          key={item.id}
          objFromDb={item}
          handleShowNew={handleShowNew}
          adminPageId={adminPageId}
          updateObj={updateObj}
          createObj={createObj}
          deleteObj={deleteObj}
        />
      ))}
    </div>
  )

}
