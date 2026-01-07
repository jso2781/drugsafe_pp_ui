import React, { useState, useEffect } from 'react'
import { Modal, Button, Space, Typography, ConfigProvider } from 'antd'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, PopupTemplateConfig } from './templateTypes'

const { Paragraph } = Typography

export default function PopupTemplate({ screenId, title, config }: TemplateBaseProps<PopupTemplateConfig>) {
  const [open, setOpen] = useState(true)

  // 2. 모바일 여부 판단 로직 추가
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 576 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  return (
    <ScreenShell screenId={screenId} title={title} uiType="popup">
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>팝업 열기</Button>
        <Button onClick={() => setOpen(false)}>닫기</Button>
      </Space>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              titleFontSize: isMobile ? 20 : 24, 
            },
          },
        }}
      >
        <Modal
          title={title}
          open={open}
          // wrapClassName={config?.className}
          wrapClassName={config?.wrapClassName}
          onOk={() => (config?.onOk ? config.onOk() : setOpen(false))}
          onCancel={() => setOpen(false)}
          okText={config?.okText || '확인'}
          cancelText={config?.cancelText || '취소'}
          width={config?.width || 760}
          styles={{
          header: {
              borderBottom: '1px solid #303336',
              paddingBottom: '15px',
              marginBottom: '15px',
            },
          }}
        >
          {config?.content || (
            <Paragraph>
              PDF 설계의 팝업 화면을 기반으로 생성된 템플릿입니다. 내부 콘텐츠 컴포넌트를 채워주세요.
            </Paragraph>
          )}
        </Modal>
      </ConfigProvider>
    </ScreenShell>
  )
}
