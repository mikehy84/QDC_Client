import { useEffect, useState } from 'react'
import { AdminMenu } from './AdminMenu';
import { Outlet } from 'react-router-dom';
import { useCreatePortfolioMutation, useDeletePortfolioMutation, useGetPortfoliosQuery, useUpdatePortfolioMutation } from '../../Api/PortfolioApi';
import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetEmployeesQuery, useUpdateEmployeeMutation } from '../../Api/EmployeeApi';
import { IPortItem } from '../../shared/interfaces/IPortItem';
import { useDispatch } from 'react-redux';
import { setEmployees } from '../../Redux/EmployeeSlice';
import { setPortfolios } from '../../Redux/PortfolioSlice';
import withAdminAuth from '../../HOC/withAdminAuth';


const AdminPanel = () => {

  const [adminPageMenuItems, setAdminPageMenuItems] = useState([
    "PORTFOLIO", "TEAM"
  ])

  const [adminPageId, setAdminPageId] = useState(-1);


  // --------------------------------------------------------------------------- //


  const dispatch = useDispatch();

  const portfoliosData = useGetPortfoliosQuery(null);
  useEffect(() => {
    if (!portfoliosData.isLoading) {
      dispatch(setPortfolios(portfoliosData.data.result));
    }
  }, [portfoliosData.isLoading]);


  const employeesData = useGetEmployeesQuery(null);
  useEffect(() => {
    if (!employeesData.isLoading) {
      dispatch(setEmployees(employeesData.data.result));
    }
  }, [employeesData.isLoading]);




  /// --------- api requests -------------------------------------------------- //
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [createPortfolio] = useCreatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  /// Employee api requests
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [createEmployee] = useCreateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  let updateObj: any;
  let createObj: any;
  let deleteObj: any;
  switch (adminPageId) {
    case 0:
      updateObj = updatePortfolio;
      createObj = createPortfolio;
      deleteObj = deletePortfolio;
      break;
    case 1:
      updateObj = updateEmployee;
      createObj = createEmployee;
      deleteObj = deleteEmployee;
      break;
  }
  // -------------------------------------------------------------------------- //

  const [showNew, setShowNew] = useState<boolean>(() => {
    return true
  });

  const handleShowNew = () => {
    setShowNew((prevState) => {
      return prevState = !showNew
    });
  }

  // -------------------------------------------------------------------------- //

  const [objFromForm, setObjFromForm] = useState<IPortItem>(() => {
    return {
      name: "",
      job: "",
      description: "",
      image: "",
      isArchive: true
    }
  });

  // -------------------------------------------------------------------------- //



  return (
    <div className="admin" >
      <AdminMenu adminPageMenuItems={adminPageMenuItems} adminPageId={adminPageId} />
      <div className='typ-list' style={{overflow:'unset'}}>
        <Outlet
          context={[
            updateObj,
            createObj,
            deleteObj,
            showNew,
            setShowNew,
            handleShowNew,
            objFromForm,
            setObjFromForm,
            adminPageId,
            setAdminPageId
          ]}
        />
      </div>
    </div>
  );
};

export default withAdminAuth(AdminPanel);