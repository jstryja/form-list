import React from 'react';
import { Col, Divider, Row, Space } from 'antd';
import CsvUpload from '@/components/header/csvUpload';
import DocxUpload from '@/components/header/docxUpload';
import GlobalForm from '@/components/header/globalForm';
import { NamePath } from 'rc-field-form/es/interface';

interface HeaderProps {
    update: () => void;
    setFieldValue: (name: NamePath, value: any) => void;
    isSubmitting: boolean;
}

const Header: React.FC<HeaderProps> = ({ update, setFieldValue, isSubmitting }) => {
    return (
        <Row>
            <Col span={6}>
                <Space>
                    <CsvUpload update={update} />

                    <DocxUpload setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                </Space>
            </Col>
            <Col span={18}>
                <GlobalForm />
            </Col>
            <Divider />
        </Row>
    );
};

export default Header;
