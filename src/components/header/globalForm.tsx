import React from 'react';
import { Form, Input } from 'antd';

interface FormProps {
    children?: React.ReactNode;
}

const GlobalForm: React.FC<FormProps> = ({ }) => {
    return (
        <>
            <Form.Item label="Datum, kdy posílám dopis" name={'sendDate'}>
                <Input />
            </Form.Item>

            <Form.Item label="Název akce" name={'title'}>
                <Input />
            </Form.Item>

            <Form.Item label="Předpokládaný termín realizace" name={'estimateDate'}>
                <Input />
            </Form.Item>

            <Form.Item label="Místo plnění" name={'place'}>
                <Input />
            </Form.Item>

            <Form.Item label="Datum do kdy mají poslat cenovou nabídku" name={'deadlineDate'}>
                <Input />
            </Form.Item>
        </>
    );
};

export default GlobalForm;
