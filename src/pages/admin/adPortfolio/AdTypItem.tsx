import React, { useState } from 'react'
import { IPortItem } from '../../../shared/interfaces/IPortItem'
import IApiResponse from '../../../shared/interfaces/IApiResponse';
import { AdTypDeleteConfirm } from './AdTypDeleteConfirm';
import qdcLogo from "../../../shared/style/images/logo/from QDC/qdc_logo jpg.jpg";
import { motion as m } from "framer-motion";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import withAdminAuth from '../../../HOC/withAdminAuth';
import { IUser } from '../../../shared/interfaces/IUser';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import loadingGif from "../../../shared/style/images/addLoadingGif.gif";
import { SD_Roles } from '../../../Utility/StaticDetails';
import toastNotify from '../../../Helper/ToastNotify';
import {toast} from "react-toastify"



interface Props {
    objFromDb: IPortItem,
    adminPageId: number,
    handleShowNew: () => void,
    updateObj: any,
    createObj: any,
    deleteObj: any
}

const AdTypItem = ({ objFromDb, adminPageId, handleShowNew, updateObj, createObj, deleteObj }: Props) => {


    const userInfo: IUser = useSelector((state: RootState) => state.userAuthStore);



    // using this const to show or hid edit buttons
    // and disable or enable fields in the form
    const [editBtn, setEditBtn] = useState(true);
    const handleEditBtn = () => {
        setEditBtn(!editBtn);
    };


    // ----------------------- handling load image here ----------------------- //
    const [imgUpload, setImgUpload] = useState<any>();
    const [imgPreview, setImgPreview] = useState<string>(() => {
        return ""
    });

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
                toastNotify("File must be less than 1 MB", "error");
                return;
            }

            else if (isImgTpyeValid.length === 0) {
                setImgUpload("");
                toastNotify("File must be in jpeg, jpg, or png", "error");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            // setImgUpload(file);
            reader.onload = (e) => {
                const imgUrl = e.target?.result as string;
                // setImgPreview(imgUrl)


                let image = new Image();

                //Set the Base64 string return from FileReader as source.
                image.src = e.target?.result as string;

                image.onload = () => {
                    let height = image.height;
                    let width = image.width;
                    if (adminPageId === 0) {
                        if (height != 1244 || width != 1772) {
                            setImgUpload("");
                            toastNotify("Image must be 1772*1244 pixels.", "error");
                            return;
                        }
                    }

                    if (adminPageId === 1) {
                        if (width != 460 || height != 525) {
                            setImgUpload("");
                            toastNotify("Image must be 460*525 pixels.", "error");
                            return;
                        }
                    }

                    setImgUpload(file);
                    setImgPreview(imgUrl)
                };
            }
        }
    }
    // ----------------------- ----------------------- ----------------------- //


    // ----------------------- handling form data here ----------------------- //
    const [objFromForm, setObjFromForm] = useState<IPortItem>(() => {
        return {
            id: objFromDb.id,
            name: objFromDb.name,
            job: objFromDb.job,
            description: objFromDb.description,
            isArchive: objFromDb.isArchive,
            image: objFromDb.image
        }
    });

    const handleChange = (evt: any) => {
        const target = evt.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setObjFromForm(() => {
            return { ...objFromForm, [name]: value }
        });
    };

    // ------------------------------------ Text Editor ------------------------------------ //
    var toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],        // toggled buttons
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    ];

    const modules = {
        toolbar: toolbarOptions
    }

    const [textEditorValue, setTextEditorValue] = useState(objFromForm.description);

    // ------------------------------------ ----------- ------------------------------------ //

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!objFromDb.id) {
            if (!imgUpload) {
                toastNotify("Please select an image.", "error");
                setLoading(false);
                return;
            }

            if (!objFromForm.name) {
                toastNotify("Please enter the name.", "error");
                setLoading(false);
                return;
            }

            if (adminPageId === 1) {
                if (!objFromForm.job) {
                    toastNotify("Please enter job title.", "error");
                    setLoading(false);
                    return;
                }
            }

            if (!textEditorValue) {
                toastNotify("Please enter description.", "error");
                setLoading(false);
                return;
            }
        }


        const formData = new FormData();
        // appends data from the form and local variables to the FromData
        if (objFromDb.id) {
            formData.append("id", objFromDb.id.toString());
        }
        formData.append("name", objFromForm.name);

        formData.append("job", objFromForm.job ? objFromForm.job : "");

        // appending text editor value to form object here
        formData.append("description", textEditorValue);

        formData.append("image", imgUpload ? imgUpload : qdcLogo);
        formData.append("isArchive", objFromForm.isArchive === true ? "true" : "false");

        // submits the data for CategoryApi
        let response: IApiResponse;
        if (objFromDb.id) {
            response = await updateObj({ data: formData, id: objFromDb.id });
        }
        else {
            response = await createObj(formData);
            handleShowNew();
        }

        if (response.data?.isSuccess) {
            setImgUpload("");
            setLoading(false);
            handleEditBtn();
            if (objFromDb.id) {
                toastNotify("Item updated successfully!");
            }
            else {
                toastNotify("Item created successfully!");
            }
        } else {
            toastNotify(response.error.data.errorMessages[0]);
        }
        setLoading(false);
    }
    // ----------------------- ----------------------- ----------------------- //


    const handleCancelBtn = () => {
        setObjFromForm(objFromDb);
        setEditBtn(!editBtn);
        setImgUpload(null);
        setImgPreview(`data:image/jpeg;base64,${objFromDb.image}`);
    };

    // ------------------------ delete product ------------------------ //
    const handleDelete = async (id: number | undefined) => {
        setLoading(true);

        // submits the data for CategoryApi
        const response: IApiResponse = await deleteObj(id);
        if (response.data?.isSuccess) {
            handleEditBtn();
            setLoading(false);
            toastNotify("Item deleted successfully!");
        } else {
            toastNotify(response.error.data.errorMessages[0], "error");
        }
        setLoading(false);
    }

    const [deleteDialogue, setDeleteDialogue] = useState(false);
    const handleDeleteConfirm = () => {
        setDeleteDialogue(!deleteDialogue);
    }

    /* //--------------- Delete Dialogue ---------------// */
    if (deleteDialogue) {
        return (
            <AdTypDeleteConfirm
                handleDelete={handleDelete}
                handleDeleteConfirm={handleDeleteConfirm}
                deletingObjId={objFromDb.id}
                deletingObjname={objFromDb?.name || ""}
                itemImg={objFromDb.image} />
        )
    }



    return (
        <m.form
            className='typ-item'
            method={objFromDb.id ? 'put' : 'post'}
            encType='multipart/form-data'
            onSubmit={handleSubmit}
            initial={{ opacity: 0.3 }}
            // animate={{ y: [-400,0] }}
            // animate={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.5 }}
        >

            {objFromDb.id ? (
                <img
                    className='typ-item-img' alt={`${objFromForm.name} photo`}
                    src={!imgPreview ? `data:image/jpeg;base64,${objFromForm?.image}` : imgPreview}
                />
            ) : (
                <img
                    className='typ-item-img' alt={`${objFromForm.name} photo`}
                    src={imgPreview ? imgPreview : qdcLogo}
                />
            )}


            <input type="file" onChange={handleFileChange} disabled={objFromDb.id ? editBtn : false} />

            <input
                placeholder='Name...'
                className='typ-item-name'
                name='name'
                type='text'
                value={objFromForm.name}
                onChange={handleChange}
                disabled={objFromDb.id ? editBtn : false}
            />

            {objFromDb.job || adminPageId === 1 ? (
                <input
                    placeholder='Job...'
                    className='typ-item-job'
                    name='job'
                    type='text'
                    value={objFromForm.job}
                    onChange={handleChange}
                    disabled={objFromDb.id ? editBtn : false}
                />
            ) : (null)}

            {/* <textarea
                className='typ-item-description'
                name='description'
                value={objFromDb.description}
                onChange={handleChange}
                disabled={objFromDb.id ? editBtn : false}
            /> */}

            {/* <div
                dangerouslySetInnerHTML={{ __html: objFromDb.description }}
            /> */}

            <ReactQuill
                placeholder='Description...'
                value={textEditorValue}
                onChange={setTextEditorValue}
                modules={modules}
                readOnly={objFromDb.id ? editBtn : false}
                style={(objFromDb.id ? !editBtn : true) ? { backgroundColor: 'var(--Gray-0)', overflow: 'scroll', maxHeight: '17rem' } : { overflow: 'scroll', maxHeight: '17rem' }}
            />

            {/* <div>{ textEditorValue }</div> */}
            {/* <div
                dangerouslySetInnerHTML={{ __html: objFromDb.description }}
            /> */}


            <label
                className='typ-item-isArchive'
                htmlFor="checkBox"
            >
                Show in Portfolio page? &nbsp;
                <input
                    name='isArchive'
                    type='checkbox'
                    checked={objFromForm.isArchive}
                    onChange={handleChange}
                    disabled={objFromDb.id ? editBtn : false}
                    style={(objFromDb.id ? editBtn : false) ? { backgroundColor: 'var(--Gray-4)' } : {}}
                />
            </label>

            {loading ? (
                <div className='typ-item-btnBox'>
                    <img src={loadingGif} className="list-btn" style={{ margin:'auto' }} />
                </div>
            ) : (

                !objFromDb.id ? (
                    <div className='typ-item-btnBox'>
                        <button className="typ-item-btn btnSecondary" onClick={handleShowNew}>Cancel</button>
                        <button className='typ-item-btn btnPrimary' >Submit</button>
                    </div>
                ) : (
                    editBtn ? (
                        <div className='typ-item-btnBox'>
                            <p className="typ-item-btn btnPrimary" style={{ width: '100%' }} onClick={handleEditBtn}>
                                <i className="bi bi-pencil-square"></i> &nbsp; Edit
                            </p>
                        </div>
                    ) :
                        <div className='typ-item-btnBox'>
                            <p className='typ-item-btn btnDanger' onClick={handleDeleteConfirm} style={{ paddingBottom: '3px' }}> Delete </p>
                            <p className='typ-item-btn btnSecondary' onClick={handleCancelBtn} style={{ paddingBottom: '3px' }}>Cancel</p>
                            <button type='submit' className='typ-item-btn btnPrimary' >Update</button>
                            {/* <Link className="list-btn m-btn-info" to={`/categories/${category.id}`} > Detail</Link> */}
                        </div>
                )

            )}




        </m.form>
    )
}

export default withAdminAuth(AdTypItem);



    // // for information..........................
    // useEffect(() => setObjFromForm(
    //     prevState => (
    //     {...prevState, objFromDb}
    //     )
    // ), [objFromDb]);

    // const handleCancelBtn = () => {
    //     setObjFromForm((prevState) => {
    //         return {
    //             id: prevState.id = objFromDb.id,
    //             name: prevState.name = objFromDb.name,
    //             description: prevState.description = objFromDb.description,
    //             isArchive: prevState.isArchive = objFromDb.isArchive,
    //             image: prevState.image = objFromDb.image
    //         }
    //     })
    //     setEditBtn(!editBtn);
    // };
