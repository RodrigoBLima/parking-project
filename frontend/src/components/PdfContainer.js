import React from 'react';
import { FiDownload } from "react-icons/fi";
import '../index.css'
export default (props) => {
    const bodyRef = React.createRef();
    const createPdf = () => props.createPdf(bodyRef.current);

    return (
        <section className="pdf-container">
            <section className="pdf-toolbar">
                <button className="btn-default-export" onClick={createPdf}><FiDownload size={20}/></button>
            </section>
            <section className="pdf-body" ref={bodyRef}>
                {props.children}
            </section>
        </section>
    )
}