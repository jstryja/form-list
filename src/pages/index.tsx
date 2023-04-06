import { Button, Checkbox, Col, Collapse, Divider, Form as AntdForm, Input, Row, Space } from 'antd';
import csvToJson from 'csvtojson';
import React, { useEffect, useState } from 'react';
import {FirmInterface, FormValues, mapDataToProfessions, ProfessionInterface, RowInterface} from '@/interfaces';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import createReport from 'docx-templates';
import Header from '@/components/header';

const { Panel } = Collapse;

export default function Home() {
    const [professionDetails, setProfessionDetails] = useState<ProfessionInterface | undefined>();
    const [professions, setProfessions] = useState<ProfessionInterface[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState();
    const update = () => {
        console.log('update');
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
        // const socket = new WebSocket(address);
        if (typeof window !== 'undefined') {
            const ls = localStorage.getItem('firm-list-form');
            setInitialValues(ls ? JSON.parse(ls) : null);
            update();
        }
    }, []);
    const [form] = AntdForm.useForm<FormValues>();
    useEffect(() => {
        form.resetFields();
    }, [initialValues]);
    const zip = new JSZip();
    const onFinish = async (values: FormValues) => {
        const proffesionsKeysWithTrueValue: string[] = [];
        Object.keys(values.checked).filter((key) => {
            if (Object.values(values.checked[key]).some((value) => value === true)) {
                proffesionsKeysWithTrueValue.push(key);
            }
        });
        const selectedProffesions: ProfessionInterface[] = professions.filter((p) =>
            proffesionsKeysWithTrueValue.includes(p.profession),
        );

        setIsSubmitting(true);
        const promises = selectedProffesions.map(async (p) => {
            const { sendDate, title, estimateDate, place, deadlineDate, workType, template } = values;
            const folder = zip.folder(p.profession);

            const firmsKeysWithTrueValue: string[] = [];
            Object.keys(values?.checked?.[p.profession]).map((firmKey) => {
                if(values?.checked?.[p.profession]?.[firmKey]) {
                    firmsKeysWithTrueValue.push(firmKey)
                }
            })
            const selectedFirms: FirmInterface[] = p.firms.filter((firm) => firmsKeysWithTrueValue.includes(firm.title))

            const subpromises = selectedFirms.map(async (firm) => {
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
                    folder?.file(`Poptávkový dopis - ${firm.title}.docx`, report);
                    resolve();
                });
            });
            await Promise.all(subpromises);
            return subpromises;
        });
        await Promise.all(promises);
        console.log('3', promises.length);
        console.log('done');
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            console.log('content', content);
            saveAs(content, 'dopisy.zip');
        });
        setIsSubmitting(false);
    };
    const onValuesChange = (changedValue: { [key: string]: any }) => {
        const ls = localStorage.getItem('firm-list-form');
        const prevObj = ls ? JSON.parse(ls) : null;
        const newObj = {
            ...prevObj,
            ...changedValue,
        };
        delete newObj.template;
        localStorage.setItem('firm-list-form', JSON.stringify(newObj));
    };

    return (
        <div style={{ height: '100vh', background: 'white', padding: '1rem' }}>
            <AntdForm
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                onValuesChange={onValuesChange}
                initialValues={initialValues}
            >
                <Header
                    btnDisabled={isSubmitting}
                    update={update}
                    setFieldValue={form.setFieldValue}
                />

                <Row>
                    <Col lg={7} md={8} sm={10} xs={11}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {professions.map((profession, index) => (
                                <Row align="middle" key={profession.profession}>
                                    {/*TODO*/}
                                    {/*<Col span={2}>*/}
                                    {/*    <Checkbox*/}
                                    {/*        onChange={(e) => {*/}
                                    {/*            profession.firms.map((firm) => {*/}
                                    {/*                console.log(*/}
                                    {/*                    'key',*/}
                                    {/*                    `checked.${profession.profession}.${firm.title}`,*/}
                                    {/*                    e.target.checked,*/}
                                    {/*                );*/}
                                    {/*                form.setFieldValue(*/}
                                    {/*                    `checked.${profession.profession}.${firm.title}`,*/}
                                    {/*                    true,*/}
                                    {/*                );*/}
                                    {/*                console.log('form', form.getFieldsValue());*/}
                                    {/*            });*/}
                                    {/*        }}*/}
                                    {/*    />*/}
                                    {/*</Col>*/}
                                    <Col span={22}>
                                        <Button
                                            block
                                            type={
                                                profession.profession === professionDetails?.profession
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            style={{ display: 'block', textAlign: 'left', width: '100%' }}
                                            onClick={() => {
                                                setProfessionDetails(profession);
                                            }}
                                        >
                                            {index + 1}. {profession.profession}
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Space>
                    </Col>
                    <Col xs={1}>
                        <Divider type={'vertical'} style={{ height: '100%' }} />
                    </Col>
                    <Col lg={16} md={15} sm={13} xs={12}>
                        {professions.map((profession) => (
                            <div
                                key={profession.profession}
                                style={{
                                    display: profession.profession === professionDetails?.profession ? 'block' : 'none',
                                }}
                            >
                                <AntdForm.Item
                                    name={['workType', profession?.profession || '']}
                                    label={
                                        'Dobrý den, jako uchazeč o generálního dodavatele této stavby se na Vás obracím se žádostí o zpracování cenové nabídky na'
                                    }
                                    labelCol={{ span: 24 }}
                                >
                                    <Input style={{ marginBottom: '0.5rem', marginTop: 0 }} placeholder={'typ práce'} />
                                </AntdForm.Item>
                                {/*neotestovano*/}
                                {profession?.firms?.map((firm) => (
                                    <Row key={firm.title} align={'middle'}>
                                        <Col sm={2} md={1}>
                                            <AntdForm.Item
                                                name={['checked', profession.profession, firm.title]}
                                                valuePropName="checked"
                                                style={{ marginBlock: 0 }}
                                            >
                                                <Checkbox />
                                            </AntdForm.Item>
                                        </Col>
                                        <Col sm={18} md={19}>
                                            <Collapse>
                                                <Panel key={firm.title} header={firm.title}>
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
                                            </Collapse>
                                        </Col>
                                        <Col sm={4} md={4} style={{ paddingLeft: '1rem' }}>
                                            {firm.web && <a style={{ color: 'black' }} href={firm.web} target={'blank'}>WEB</a>}
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        ))}
                    </Col>
                </Row>
            </AntdForm>
        </div>
    );
}
