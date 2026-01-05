import React, { useMemo } from 'react'
import { Card, Form, Row, Col, Input, Select, DatePicker, Button, Space, Typography } from 'antd'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, ListTemplateConfig, ListSearchFieldConfig, ListButtonConfig } from './templateTypes'
import type { ColDef } from 'ag-grid-community'

const { RangePicker } = DatePicker
const { Text } = Typography

export default function ListTemplate({ screenId, title, config }: TemplateBaseProps<ListTemplateConfig>) {
  const [form] = Form.useForm()

  const columnDefs = useMemo<ColDef<Record<string, unknown>>[]>(() => {
    return (config?.columns?.length ? config.columns : [
      { headerName: '컬럼1', field: 'col1', flex: 1 },
      { headerName: '컬럼2', field: 'col2', flex: 1 },
      { headerName: '컬럼3', field: 'col3', flex: 1 }
    ])
  }, [config])

  const rowData = useMemo(() => (config?.rowData?.length ? config.rowData : config?.sampleData?.length ? config.sampleData : [
    { col1: '샘플', col2: '데이터', col3: '입니다' }
  ]), [config])

  return (
    <ScreenShell screenId={screenId} title={title} uiType="list">
      <Card>
        <Form form={form} layout="vertical" onFinish={config?.onSearch as ((values: unknown) => void) | undefined}>
          <Row gutter={12}>
            {(config?.searchFields?.length ? config.searchFields : [
              { key: 'keyword', label: '키워드', type: 'input', placeholder: '검색어' },
              { key: 'status', label: '상태', type: 'select', options: [{ label: '전체', value: '' }, { label: '사용', value: 'Y' }, { label: '미사용', value: 'N' }] },
              { key: 'range', label: '기간', type: 'range' }
            ]).map((f) => (
              <Col key={f.key} xs={24} md={8}>
                <Form.Item name={f.key} label={f.label}>
                  {f.type === 'select' ? (
                    <Select options={f.options || []} placeholder={f.placeholder} />
                  ) : f.type === 'range' ? (
                    <RangePicker style={{ width: '100%' }} />
                  ) : (
                    <Input placeholder={f.placeholder} />
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Space>
            <Button type="primary" htmlType="submit">조회</Button>
            <Button onClick={() => form.resetFields()}>초기화</Button>
            {config?.extraActions as React.ReactNode}
          </Space>
          {config?.hint ? (
            <div style={{ marginTop: 8 }}><Text type="secondary">{typeof config?.hint === 'string' ? config.hint : String(config?.hint ?? '')}</Text></div>
          ) : null}
        </Form>
      </Card>

      <div style={{ height: 12 }} />

      <Card>
        <div className="ag-theme-quartz" style={{ height: (config?.height as number | undefined) || (config?.gridHeight as number | undefined) || 520, width: '100%' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData as Record<string, unknown>[]}
            rowSelection={(config?.rowSelection as 'single' | 'multiple' | undefined) || 'single'}
            animateRows
          />
        </div>

        <div style={{ height: 12 }} />

        <Space>
          {((config?.footerButtons?.length ? config.footerButtons : [
            { key: 'create', label: '등록', type: 'primary', onClick: config?.onCreate },
            { key: 'excel', label: '엑셀다운로드', onClick: config?.onExport }
          ]) as ListButtonConfig[]).map((b: ListButtonConfig) => (
            <Button
              key={b.key}
              type={b.type}
              onClick={b.onClick}
              disabled={b.disabled}
            >
              {b.label}
            </Button>
          ))}
        </Space>
      </Card>
    </ScreenShell>
  )
}