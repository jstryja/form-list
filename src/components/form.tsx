import React from 'react';
import { Form as AntdForm, Input } from 'antd';

interface FormProps {
    children?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ }) => {
    return (
        <>
            <AntdForm.Item label="Datum, kdy posílám dopis" name={'sendDate'}>
                <Input />
            </AntdForm.Item>

            <AntdForm.Item label="Název akce" name={'title'}>
                <Input />
            </AntdForm.Item>

            <AntdForm.Item label="Předpokládaný termín realizace" name={'estimateDate'}>
                <Input />
            </AntdForm.Item>

            <AntdForm.Item label="Místo plnění" name={'place'}>
                <Input />
            </AntdForm.Item>

            <AntdForm.Item label="Datum do kdy mají poslat cenovou nabídku" name={'deadlineDate'}>
                <Input />
            </AntdForm.Item>
        </>
    );
};

export default Form;
