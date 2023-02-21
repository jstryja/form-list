import {Button, Col, Divider, Row, Space} from "antd";
import {useEffect, useState} from "react";
import csvToJson from 'csvtojson';

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
    const [data, setData] = useState<RowInterface[]>([]);
    const [professionDetails, setProfessionDetails] = useState<RowInterface | undefined>()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ls = localStorage.getItem('firm-list');
            csvToJson().fromString(ls as string).then((json) => {
                setData(json);
                setProfessionDetails(json[0])
            });
        }
    }, [])


    return (
        <div style={{height: '100vh', background: 'white', padding: '1rem'}}>
            <Row>
                <Col>
                    Nahrej CSV:
                </Col>
                <Divider/>
            </Row>

            <Row>
                <Col span={4}>
                    <Space direction="vertical">
                        {data.map((row, index) => (
                            <Button key={index} type={row.profession === professionDetails?.profession ? 'primary' : 'default'}
                                    style={{display: 'block'}} onClick={() => {
                                setProfessionDetails(row)
                            }}>
                                {index + 1}. {row.profession}
                            </Button>
                        ))}
                    </Space>
                </Col>
                <Col span={10}>
                    <Divider type={'vertical'} style={{height: '100%'}}/>

                    {professionDetails?.col1row1} <br/>
                    {professionDetails?.col1row2} <br/>
                    {professionDetails?.col1row3} <br/><br/>
                    {professionDetails?.col1row4} <br/>
                    {professionDetails?.col1row5} <br/>
                    {professionDetails?.col1row6} <br/>
                </Col>
                <Col span={10}>
                    <Divider type={'vertical'} style={{height: '100%'}}/>
                    {professionDetails?.col2row1} <br/>
                    {professionDetails?.col2row2} <br/>
                    {professionDetails?.col2row3} <br/><br/>
                    {professionDetails?.col2row4} <br/>
                    {professionDetails?.col2row5} <br/>
                    {professionDetails?.col2row6} <br/>
                </Col>
            </Row>
        </div>
    )
}
