import React from 'react'
import { Card, Form, Row, Col, Input, Select, DatePicker, Checkbox, Radio, Button, Space, Divider } from 'antd'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, FormTemplateConfig, FormFieldConfig, FormSectionConfig } from './templateTypes'

export default function FormTemplate({ screenId, title, config }: TemplateBaseProps<FormTemplateConfig>) {
  const [form] = Form.useForm()

  const fields: FormFieldConfig[] = config?.fields?.length
    ? config.fields
    : [
        { key: 'field1', label: '필드1', type: 'input', required: true, span: 12 },
        { key: 'field2', label: '필드2', type: 'select', options: [{ label: '선택', value: '' }], span: 12 },
        { key: 'field3', label: '날짜', type: 'date', span: 12 }
      ]

  const sections: FormSectionConfig[] = (config?.sections ?? []) as FormSectionConfig[]

  return (
    <ScreenShell screenId={screenId} title={title} uiType={config?.uiType || 'form'}>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={config?.onSubmit as ((values: unknown) => void) | undefined}
          initialValues={config?.initialValues as Record<string, unknown> | undefined}
        >
          <Row gutter={12}>
            {fields.map((f) => (
              <Col key={f.key} xs={24} md={f.span || 12}>
                <Form.Item
                  name={f.key}
                  label={f.label}
                  rules={f.required ? [{ required: true, message: `${f.label}을(를) 입력하세요.` }] : []}
                  valuePropName={f.type === 'checkbox' ? 'checked' : 'value'}
                >
                  {f.type === 'select' ? (
                    <Select options={f.options || []} placeholder={f.placeholder} />
                  ) : f.type === 'date' ? (
                    <DatePicker style={{ width: '100%' }} />
                  ) : f.type === 'radio' ? (
                    <Radio.Group options={f.options || []} />
                  ) : f.type === 'checkbox' ? (
                    <Checkbox>{f.placeholder || ''}</Checkbox>
                  ) : (
                    <Input placeholder={f.placeholder} />
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>

          {sections.length ? (
            <>
              <Divider />
              {sections.map((sec) => (
                <Card key={sec.key} type="inner" title={sec.title} style={{ marginBottom: 12 }}>
                  {sec.content}
                </Card>
              ))}
            </>
          ) : null}

          <Space>
            <Button type="primary" htmlType="submit">
              {config?.submitLabel || '저장'}
            </Button>
            <Button onClick={() => (config?.onCancel ? config.onCancel() : form.resetFields())}>
              {config?.cancelLabel || '취소'}
            </Button>
            {config?.extraActions}
          </Space>
        </Form>
      </Card>
    </ScreenShell>
  )
}
