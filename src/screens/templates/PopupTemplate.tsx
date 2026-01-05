import React, { useState } from 'react'
import { Modal, Button, Space, Typography } from 'antd'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, PopupTemplateConfig } from './templateTypes'

const { Paragraph } = Typography

export default function PopupTemplate({ screenId, title, config }: TemplateBaseProps<PopupTemplateConfig>) {
  const [open, setOpen] = useState(true)

  return (
    <ScreenShell screenId={screenId} title={title} uiType="popup">
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>팝업 열기</Button>
        <Button onClick={() => setOpen(false)}>닫기</Button>
      </Space>

      <Modal
        title={title}
        open={open}
        onOk={() => (config?.onOk ? config.onOk() : setOpen(false))}
        onCancel={() => setOpen(false)}
        okText={config?.okText || '확인'}
        cancelText={config?.cancelText || '취소'}
        width={config?.width || 720}
      >
        {config?.content || (
          <Paragraph>
            PDF 설계의 팝업 화면을 기반으로 생성된 템플릿입니다. 내부 콘텐츠 컴포넌트를 채워주세요.
          </Paragraph>
        )}
      </Modal>
    </ScreenShell>
  )
}
