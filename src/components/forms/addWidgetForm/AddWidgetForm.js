import React from 'react';
import { Modal, Input, Select, Button } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextArea from 'antd/es/input/TextArea';
// import { getCategoryOptions } from '../../../utils/utils';

const { Option } = Select;


const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required('Category Name is required'),
  widgetName: Yup.string().required('Widget Name is required'),
  widgetType: Yup.string().oneOf(['pieChart', 'straightPieChart'], 'Invalid Chart Type').required('Widget Type is required'),
  widgetText: Yup.string().required('Widget Text is required'),
  widgetData: Yup.string()
    .required('Widget Data is required')
    .test('is-json', 'Invalid JSON format', value => {
      try {
        JSON.parse(value);
        return true;
      } catch (e) {
        return false;
      }
    })
});

const AddWidgetForm = ({ visible, onCancel, onSubmit }) => {
  return (
    <Modal
      title="Add New Widget"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Formik
        initialValues={{ categoryName: '', widgetName: '', widgetType: '', widgetText: '', widgetData: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({ handleChange, touched, errors }) => (
          <Form>
            <div style={{ marginBottom: 16 }}>
              <Field name="categoryName" as={Input} placeholder="Category Name" />
              <ErrorMessage name="categoryName" component="div" style={{ color: 'red' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Field name="widgetName" as={Input} placeholder="Widget Name" />
              <ErrorMessage name="widgetName" component="div" style={{ color: 'red' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Select
                name="widgetType"
                placeholder="Select Chart Type"
                style={{ width: '100%' }}
                onChange={value => handleChange({ target: { name: 'widgetType', value } })}
              >
                <Option value="pieChart">Pie Chart</Option>
                <Option value="straightPieChart">Straight Pie Chart</Option>
              </Select>
              <ErrorMessage name="widgetType" component="div" style={{ color: 'red' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Field name="widgetText" as={Input} placeholder="Widget Text" />
              <ErrorMessage name="widgetText" component="div" style={{ color: 'red' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Field
                name="widgetData"
                as={TextArea}
                placeholder='Enter data in format: [{"label": "A", "value": 10}, {"label": "B", "value": 20}]'
                rows={4}
              />
              <ErrorMessage name="widgetData" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <Button type="primary" htmlType="submit">
                Add New Widget
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddWidgetForm;
