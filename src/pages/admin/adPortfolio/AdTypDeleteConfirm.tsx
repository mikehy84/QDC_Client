import { motion as m } from "framer-motion";

interface Props {
    handleDelete: (id: number | undefined) => Promise<void>,
    handleDeleteConfirm: () => void,
    deletingObjId: number | undefined,
    deletingObjname: string,
    itemImg: string
};

export const AdTypDeleteConfirm = ({ handleDelete, handleDeleteConfirm, deletingObjId, deletingObjname, itemImg }: Props) => {
    return (
        <m.div
            className="typ-item"
            initial={{ opacity: 0.3 }}
            animate={{ opacity:1}}
            transition={{ ease: "easeIn", duration: 0.5 }}
        >
            <img
                className='typ-item-img' alt={`photo`}
                src={`data:image/jpeg;base64,${itemImg}`}
            />
            <h2 style={{ fontStyle: "italic", textAlign: "center", color:'var(--Red-8)' }}>You are about to delete:</h2>
            <h3 style={{ textAlign: "center" }}>"{deletingObjname}"</h3>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
                <i className="bi bi-exclamation-triangle" style={{ fontSize: "1.5rem", color: 'var(--Red-8)', textAlign: 'center' }}></i>
                &nbsp;<h4 style={{ textAlign:'center' }}>Please note this is irrevertible</h4>&nbsp;
                <i className="bi bi-exclamation-triangle" style={{ fontSize: "1.5rem", color: 'var(--Red-8)', textAlign: 'center' }}></i>
            </div>
            <h4 style={{ textAlign:'center' }}>Are you sure of deleting?</h4>
            <div className='typ-item-btnBox' style={{ justifyContent: 'center', alignItems:'flex-end' }}>
                <button className="typ-item-btn btnDanger" onClick={()=>handleDelete(deletingObjId)} style={{ margin:'0.5rem'}}>Yes</button>
                <button className="typ-item-btn btnSuccess" onClick={handleDeleteConfirm} style={{ margin:'0.5rem'}}>No</button>
            </div>
        </m.div>
    )
}
