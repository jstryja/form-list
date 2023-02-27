import { Button, Col, Collapse, Divider, Form as AntdForm, Input, Row, Space } from 'antd';
import csvToJson from 'csvtojson';
import React, { useEffect, useState } from 'react';
import { FormValues, mapDataToProfessions, ProfessionInterface, RowInterface } from '@/interfaces';
import JSZip from 'jszip';
import Form from '@/components/form';
import CsvUpload from '@/components/csvUpload';
import DocxUpload from '@/components/docxUpload';
import { saveAs } from 'file-saver';
import createReport from 'docx-templates';

const { Panel } = Collapse;

export default function Home() {
    const [professionDetails, setProfessionDetails] = useState<ProfessionInterface | undefined>();
    const [professions, setProfessions] = useState<ProfessionInterface[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const update = () => {
        const ls = localStorage.getItem('firm-list');
        if (!ls) return;
        csvToJson()
            .fromString(ls as string)
            .then((json: RowInterface[]) => {
                setProfessionDetails(mapDataToProfessions(json)[0]);
                setProfessions(mapDataToProfessions(json));
            });
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            update();
        }
    }, []);

    const zip = new JSZip();
    const [form] = AntdForm.useForm<FormValues>();
    const onFinish = async (values: FormValues) => {
        setIsSubmitting(true);
        const promises = professions.map(async (p) => {
            const { sendDate, title, estimateDate, place, deadlineDate, workType, template } = values;
            const folder = zip.folder(p.profession);
            const subpromises = p.firms.map(async (firm) => {
                return new Promise<void>(async (resolve) => {
                    const report = await createReport({
                        template,
                        data: {
                            sendDate,
                            title,
                            estimateDate,
                            place,
                            deadlineDate,
                            workType: workType[p.profession],
                            firmTitle: firm.title || '',
                            firmStreet: firm.street || '',
                            firmCity: firm.city || '',
                            firmPerson: firm.person || '',
                            firmPhone: firm.phone || '',
                            firmEmail: firm.email || '',
                        },
                    });
                    folder?.file(`${firm.title}.docx`, report);
                    resolve();
                });
            });
            await Promise.all(subpromises);
            return subpromises;
        });
        await Promise.all(promises);
        console.log('done');
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, 'dopisy.zip');
        });
        setIsSubmitting(false);
    };

    return (
        <div style={{ height: '100vh', background: 'white', padding: '1rem' }}>
            <AntdForm
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                initialValues={{ template: null }}
            >
                <Row>
                    <Col span={6}>
                        <Space>
                            <CsvUpload update={update} />

                            <DocxUpload setFieldValue={form.setFieldValue} isSubmitting={isSubmitting} />
                        </Space>
                    </Col>
                    <Col span={18}>
                        <Form />
                    </Col>
                    <Divider />
                </Row>

                <Row>
                    <Col span={4}>
                        <Space direction="vertical">
                            {professions.map((profession, index) => (
                                <Button
                                    key={profession.profession}
                                    block
                                    type={
                                        profession.profession === professionDetails?.profession ? 'primary' : 'default'
                                    }
                                    style={{ display: 'block', textAlign: 'left' }}
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
                        {professions.map((profession) => (
                            <div
                                key={profession.profession}
                                style={{
                                    display: profession.profession === professionDetails?.profession ? 'block' : 'none',
                                }}
                            >
                                <AntdForm.Item name={['workType', profession?.profession || '']}>
                                    <Input style={{ marginBottom: '0.5rem' }} placeholder={'typ práce'} />
                                </AntdForm.Item>
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
                            </div>
                        ))}
                    </Col>
                </Row>
            </AntdForm>
        </div>
    );
}
