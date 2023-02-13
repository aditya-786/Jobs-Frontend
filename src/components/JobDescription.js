import { Modal } from 'antd';
import React from "react";

const JobDescription = ({ open, onok, oncancel, data }) => {
    return (
        <Modal open={open} onOk={onok} onCancel={oncancel} footer={null} centered>
            <div>
                <p>Exerience Required: {data.experience} </p>
                <p>Minimum Education Required: {data.minEducation} </p>
                <p>English Proficiency: {data.englishProficiency} </p>
                <p>Skills Required: {data.skills}</p>
                <p>Documents Required: {data.documents}</p>
            </div>
        </Modal>
    )
}

export default JobDescription;