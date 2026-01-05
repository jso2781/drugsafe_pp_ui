import React from 'react'
import { Card, Descriptions, Space, Button } from 'antd'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, DetailTemplateConfig, DetailItemConfig, DetailButtonConfig } from './templateTypes'

export default function DetailTemplate({ screenId, title, config }: TemplateBaseProps<DetailTemplateConfig>) {
  const items: DetailItemConfig[] = config?.items?.length
    ? config.items
    : [
        { key: 'item1', label: '항목1', value: '값1' },
        { key: 'item2', label: '항목2', value: '값2' }
      ]

  const buttons: DetailButtonConfig[] = config?.buttons?.length
    ? config.buttons
    : [{ key: 'back', label: '목록', onClick: () => window.history.back() }]

  return (
    <ScreenShell screenId={screenId} title={title} uiType={config?.uiType || 'detail'}>
      <Card>
        <Descriptions bordered column={1} size="middle">
          {items.map((it) => (
            <Descriptions.Item key={it.key} label={it.label}>
              {it.value ?? ''}
            </Descriptions.Item>
          ))}
        </Descriptions>

        <div style={{ height: 12 }} />

        <Space>
          {buttons.map((b) => (
            <Button key={b.key} type={b.type} onClick={b.onClick} disabled={b.disabled}>
              {b.label}
            </Button>
          ))}
        </Space>
      </Card>
    </ScreenShell>
  )
}
