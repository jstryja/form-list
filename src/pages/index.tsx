import { Button, Col, Collapse, Divider, message, Row, Space, Upload } from 'antd';
import csvToJson from 'csvtojson';
import { useEffect, useState } from 'react';
import { mapDataToProfessions, ProfessionInterface, RowInterface } from '@/interfaces';
import createReport from 'docx-templates';

const { Panel } = Collapse;
const { Dragger } = Upload;

export default function Home() {
    const [file, setFile] = useState<string>();
    const [professionDetails, setProfessionDetails] = useState<ProfessionInterface | undefined>();
    const [professions, setProfessions] = useState<ProfessionInterface[]>([]);
    const [docxFileUrl, setDocxFileUrl] = useState<string>();
    const update = () => {
        const ls = localStorage.getItem('firm-list');
        if (!ls) return;
        csvToJson()
            .fromString(ls as string)
            .then((json: RowInterface[]) => {
                setProfessionDetails(mapDataToProfessions(json)[0]);
                setProfessions(mapDataToProfessions(json));
                console.log('prof', mapDataToProfessions(json));
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
                            ODESLAT
                        </Button>

                        <Dragger
                            customRequest={({ onSuccess }) => {
                                onSuccess && onSuccess('ok');
                            }}
                            beforeUpload={(file) => {
                                console.log('file.type', file.type);
                                const isCSV =
                                    file.type ===
                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                                if (!isCSV) {
                                    message.error(`${file.name} není docx soubor.`);
                                }
                                return isCSV || Upload.LIST_IGNORE;
                            }}
                            maxCount={1}
                            onChange={(info) => {
                                if (info.file.status === 'done') {
                                    const reader = new FileReader();
                                    const reader2 = new FileReader();
                                    reader2.onload = (e) => {
                                        e.preventDefault();
                                        if (typeof e.target?.result === 'string') {
                                            console.log('e.target?.result', e.target?.result);
                                            setDocxFileUrl(e.target?.result);
                                        }
                                    };
                                    reader.onload = async (e) => {
                                        e.preventDefault();
                                        // console.log('e.target?.result', e.target?.result);
                                        const template = Buffer.from(e.target?.result as ArrayBuffer);
                                        console.log('template', template);
                                        const report = await createReport({
                                            template,
                                            data: {
                                                title: 'Abc',
                                                surname: 'Appleseed',
                                            },
                                        });
                                        console.log('new Blob([report])', new Blob([report]));
                                        reader2.readAsDataURL(new Blob([report]));
                                        // if (typeof e.target?.result === 'string') setDocxFileUrl(e.target.result);
                                    };
                                    if (info.file.originFileObj) {
                                        reader.readAsArrayBuffer(info.file.originFileObj);
                                    }
                                }
                            }}
                        >
                            <p className="ant-upload-text">Nahrej docx</p>
                        </Dragger>
                        <Button disabled={!docxFileUrl}>
                            <a href={docxFileUrl} download>
                                Stáhnout
                            </a>
                        </Button>
                    </Space>
                </Col>
                <Divider />
            </Row>

            <Row>
                <Col span={4}>
                    <Space direction="vertical">
                        {professions.map((profession, index) => (
                            <Button
                                key={index}
                                type={profession.profession === professionDetails?.profession ? 'primary' : 'default'}
                                style={{ display: 'block' }}
                                onClick={() => {
                                    setProfessionDetails(profession);
                                }}
                            >
                                {index + 1}. {profession.profession}
                            </Button>
                        ))}
                    </Space>
                </Col>
                <Col span={1}>
                    <Divider type={'vertical'} style={{ height: '100%' }} />
                </Col>
                <Col span={18}>
                    <Collapse>
                        {professionDetails?.firms?.map((firm, index) => (
                            <Panel header={firm.title} key={firm.title || index}>
                                {firm.title && (
                                    <>
                                        <b>{firm.title}</b> <br />
                                    </>
                                )}
                                {firm.street && (
                                    <>
                                        {firm.street}
                                        <br />
                                    </>
                                )}
                                {firm.city && (
                                    <>
                                        {firm.city}
                                        <br />
                                    </>
                                )}
                                <br />
                                {firm.person && (
                                    <>
                                        <b>{firm.person}</b> <br />
                                    </>
                                )}
                                {firm.phone && (
                                    <>
                                        {firm.phone}
                                        <br />
                                    </>
                                )}
                                {firm.email && (
                                    <>
                                        {firm.email}
                                        <br />
                                    </>
                                )}
                            </Panel>
                        ))}
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
}
