import { Button, Col, Divider, message, Row, Space, Upload } from 'antd';
import csvToJson from 'csvtojson';
import { useEffect, useState } from 'react';

const { Dragger } = Upload;

interface RowInterface {
    profession: string;
    col1row1?: string;
    col1row2?: string;
    col1row3?: string;
    col1row4?: string;
    col1row5?: string;
    col1row6?: string;
    col2row1?: string;
    col2row2?: string;
    col2row3?: string;
    col2row4?: string;
    col2row5?: string;
    col2row6?: string;
}

export default function Home() {
    const [file, setFile] = useState<string>();
    const [data, setData] = useState<RowInterface[]>([]);
    const [professionDetails, setProfessionDetails] = useState<RowInterface | undefined>();
    const update = () => {
        const ls = localStorage.getItem('firm-list');
        if (!ls) return;
        csvToJson()
            .fromString(ls as string)
            .then((json) => {
                setData(json);
                setProfessionDetails(json[0]);
            });
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            update();
        }
    }, []);

    return (
        <div style={{ height: '100vh', background: 'white', padding: '1rem' }}>
            <Row>
                <Col>
                    <Space>
                        <Dragger
                            beforeUpload={(file) => {
                                console.log('file.type', file.type);
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
                                localStorage.setItem('firm-list', file || '');
                                message.success('Soubor nahrán.');
                                update();
                            }}
                        >
                            ODESLAT
                        </Button>
                    </Space>
                </Col>
                <Divider />
            </Row>

            <Row>
                <Col span={4}>
                    <Space direction="vertical">
                        {data.map((row, index) => (
                            <Button
                                key={index}
                                type={row.profession === professionDetails?.profession ? 'primary' : 'default'}
                                style={{ display: 'block' }}
                                onClick={() => {
                                    setProfessionDetails(row);
                                }}
                            >
                                {index + 1}. {row.profession}
                            </Button>
                        ))}
                    </Space>
                </Col>
                <Col span={10}>
                    <Divider type={'vertical'} style={{ height: '100%' }} />
                    {professionDetails?.col1row1} <br />
                    {professionDetails?.col1row2} <br />
                    {professionDetails?.col1row3} <br />
                    <br />
                    {professionDetails?.col1row4} <br />
                    {professionDetails?.col1row5} <br />
                    {professionDetails?.col1row6} <br />
                </Col>
                <Col span={10}>
                    <Divider type={'vertical'} style={{ height: '100%' }} />
                    {professionDetails?.col2row1} <br />
                    {professionDetails?.col2row2} <br />
                    {professionDetails?.col2row3} <br />
                    <br />
                    {professionDetails?.col2row4} <br />
                    {professionDetails?.col2row5} <br />
                    {professionDetails?.col2row6} <br />
                </Col>
            </Row>
        </div>
    );
}
