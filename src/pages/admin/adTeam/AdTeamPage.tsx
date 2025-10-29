import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IPortItem } from '../../../shared/interfaces/IPortItem';
import { MainLoader } from '../../../shared/components/MainLoader/MainLoader';
import { AdTypNew } from '../adPortfolio/AdTypNew';
import AdTypItem from '../adPortfolio/AdTypItem';
import { useOutletContext } from 'react-router-dom';
import { RootState } from '../../../Redux/Store';
import { useGetEmployeesQuery } from '../../../Api/EmployeeApi';
import { setEmployees } from '../../../Redux/EmployeeSlice';

export const AdTeamPage = () => {

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
  const { data, isLoading } = useGetEmployeesQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setEmployees(data.result));
    }
    setAdminPageId(1);
  }, [isLoading]);

  useEffect(() => {
    setAdminPageId(1);
  }, []);

  // const dataFromApi = useSelector((state: RootState) => state.employeeStore);


  if (isLoading) {
    return <MainLoader />
  };

  return (
    <div className='typ-list'>
      {showNew ? (
          <AdTypNew key={-1} showNew={showNew} handleShowNew={handleShowNew} />
      ) : (

          <AdTypItem
            key={-1}
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
