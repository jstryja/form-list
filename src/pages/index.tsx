import {Button, Col, Divider, Row, Space} from "antd";
import {useState} from "react";

export default function Home() {
    const professions = ['zemní práce', 'beton', 'obklady, dlažby'];
    const info = new Map([['zemní práce', 'Firma 1']])

    interface DataInterface {
        profession: string;
        col1: {
            row1?: string;
            row2?: string;
            row3?: string;
            row4?: string;
            row5?: string;
            row6?: string;
        };
        col2: {
            row1?: string;
            row2?: string;
            row3?: string;
            row4?: string;
            row5?: string;
            row6?: string;
        };

    }

    const data = [{}]
    const [selectedProfession, setSelectedProfession] = useState(professions[0]);
    return (
        <div style={{height: '100vh', background: 'white', padding: '1rem'}}>
            <Row>
                <Col>
                    Header
                </Col>
                <Divider/>
            </Row>

            <Row>
                <Col span={4}>
                    <Space direction="vertical">
                        {professions.map((profession, index) => (
                            <Button key={index} type={profession === selectedProfession ? 'primary' : 'default'}
                                    style={{display: 'block'}} onClick={() => setSelectedProfession(profession)}>
                                {index + 1}. {profession}
                            </Button>
                        ))}
                    </Space>
                </Col>
                <Col span={10}>
                    <Divider type={'vertical'} style={{height: '100%'}}/>

                    {selectedProfession}
                </Col>
                <Col span={10}>
                    <Divider type={'vertical'} style={{height: '100%'}}/>
                    {selectedProfession}
                </Col>
            </Row>
        </div>
    )
}
