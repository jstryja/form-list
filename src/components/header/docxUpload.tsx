import React from 'react';
import { Button, Form as AntdForm, message, Upload } from 'antd';
import { NamePath } from 'rc-field-form/es/interface';

const { Dragger } = Upload;

interface DocxUploadProps {
    setFieldValue: (name: NamePath, value: any) => void;
    btnDisabled: boolean;
}

const DocxUpload: React.FC<DocxUploadProps> = ({ setFieldValue, btnDisabled }) => {
    return (
        <>
            <AntdForm.Item name={'template'}>
                <Dragger
                    customRequest={({ onSuccess }) => {
                        onSuccess && onSuccess('ok');
                    }}
                    beforeUpload={(file) => {
                        const isCSV =
                            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                        if (!isCSV) {
                            message.error(`${file.name} není docx soubor.`);
                        }
                        return isCSV || Upload.LIST_IGNORE;
                    }}
                    maxCount={1}
                    onChange={(info) => {
                        if (info.file.status === 'done') {
                            const reader = new FileReader();
                            reader.onload = async (e) => {
                                e.preventDefault();
                                const template = Buffer.from(e.target?.result as ArrayBuffer);
                                setFieldValue('template', template);
                            };
                            if (info.file.originFileObj) {
                                reader.readAsArrayBuffer(info.file.originFileObj);
                            }
                        }
                    }}
                >
                    <p className="ant-upload-text">Nahrej šablonu .docx</p>
                </Dragger>
            </AntdForm.Item>
            <Button disabled={btnDisabled} htmlType="submit">
                Stáhnout zip
            </Button>
        </>
    );
};

export default DocxUpload;
