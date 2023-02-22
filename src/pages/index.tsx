import {Button, Col, Divider, message, Row, Space, Upload} from 'antd';
import csvToJson from 'csvtojson';
import {useEffect, useState} from 'react';
import {mapDataToProfessions, ProfessionInterface, RowInterface} from "@/interfaces";
import {Collapse} from 'antd';

const {Panel} = Collapse;
const {Dragger} = Upload;


export default function Home() {
    const [file, setFile] = useState<string>();
    const [professionDetails, setProfessionDetails] = useState<ProfessionInterface | undefined>();
    const [professions, setProfessions] = useState<ProfessionInterface[]>([])

    const update = () => {
        const ls = localStorage.getItem('firm-list');
        if (!ls) return;
        csvToJson()
            .fromString(ls as string)
            .then((json: RowInterface[]) => {
                setProfessionDetails(mapDataToProfessions(json)[0]);
                setProfessions(mapDataToProfessions(json))
                console.log('prof', mapDataToProfessions(json));
            });
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            update();
        }
    }, []);

    return (
        <div style={{height: '100vh', background: 'white', padding: '1rem'}}>
            <Row>
                <Col>
                    <Space>
                        <Dragger
                            customRequest={({onSuccess}) => {
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
                                    message.error('Prázdný soubor')
                                }
                                update();
                            }}
                            disabled={!file}
                        >
                            ODESLAT
                        </Button>
                    </Space>
                </Col>
                <Divider/>
            </Row>

            <Row>
                <Col span={4}>
                    <Space direction="vertical">
                        {professions.map((profession, index) => (
                            <Button
                                key={index}
                                type={profession.profession === professionDetails?.profession ? 'primary' : 'default'}
                                style={{display: 'block'}}
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
                    <Divider type={'vertical'} style={{height: '100%'}}/>
                </Col>
                <Col span={18}>


                    <Collapse>
                        {professionDetails?.firms?.map((firm, index) => (
                            <Panel header={firm.title} key={index}>
                                {firm.title} <br/>
                                {firm?.street} <br/>
                                {firm?.city} <br/>
                                <br/>
                                {firm?.person} <br/>
                                {firm?.phone} <br/>
                                {firm?.email} <br/>
                            </Panel>))}
                    </Collapse>
                </Col>
                {/*<Col span={10}>*/}
                {/*    <Divider type={'vertical'} style={{height: '100%'}}/>*/}
                {/*    {professionDetails?.col2row1} <br/>*/}
                {/*    {professionDetails?.col2row2} <br/>*/}
                {/*    {professionDetails?.col2row3} <br/>*/}
                {/*    <br/>*/}
                {/*    {professionDetails?.col2row4} <br/>*/}
                {/*    {professionDetails?.col2row5} <br/>*/}
                {/*    {professionDetails?.col2row6} <br/>*/}
                {/*</Col>*/}
            </Row>
        </div>
    );
}
