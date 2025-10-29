import { motion as m } from "framer-motion";

interface Props {
    showNew: boolean,
    handleShowNew: () => void
};


export const AdTypNew = ({ handleShowNew }: Props) => {

    return (
        <m.div
            style={{
                marginTop:'0rem',
                marginBottom: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'absolute',
                top: '0',
                left: '0rem'
            }}
            // animate={{ rotate: [360], y: [0, 200, 200, 0] }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity:1}}
            transition={{ ease: "anticipate", duration: 0.5 }}

            drag
            dragTransition={{ power: 0.1 }}

            // dragTransition={{
            //     min:-150,
            //     max: 100,
            //     // bounceStiffness: 100
            //     bounceDamping: 8
            // }}
        >
            <p
                className="typ-item-btn btnPrimary"
                style={{
                    width: '5rem',
                    height: '2rem',
                    fontSize: '1rem',
                    backgroundColor: 'var(--Green-81)',
                    color: 'var(--Gray-2)',
                    borderRadius: '0',
                    letterSpacing: '1.5px',
                    fontStyle:'italic'
                }}
                onClick={handleShowNew}
            > NEW
            </p>
        </m.div>
    )
}
