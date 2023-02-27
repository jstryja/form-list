import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';

const { Dragger } = Upload;

interface CsvUploadProps {
    update: () => void;
}

const CsvUpload: React.FC<CsvUploadProps> = ({ update }) => {
    const [file, setFile] = useState<string>();
    return (
        <>
            <Dragger
                customRequest={({ onSuccess }) => {
                    onSuccess && onSuccess('ok');
                }}
                beforeUpload={(file) => {
                    const isCSV = file.type === 'text/csv';
                    if (!isCSV) {
                        message.error(`${file.name} není csv soubor.`);
                    }
                    return isCSV || Upload.LIST_IGNORE;
                }}
                maxCount={1}
                onChange={(info) => {
                    if (info.file.status === 'done') {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            e.preventDefault();
                            if (typeof e.target?.result === 'string') setFile(e.target.result);
                        };
                        if (info.file.originFileObj) {
                            reader.readAsText(info.file.originFileObj);
                        }
                    }
                }}
            >
                <p className="ant-upload-text">Nahrej CSV</p>
            </Dragger>

            <Button
                type={'primary'}
                onClick={() => {
                    if (file) {
                        localStorage.setItem('firm-list', file);
                        console.log('file', file);
                        message.success('Soubor nahrán.');
                    } else {
                        message.error('Prázdný soubor');
                    }
                    update();
                }}
                disabled={!file}
            >
                ULOŽIT CSV
            </Button>
        </>
    );
};

export default CsvUpload;
