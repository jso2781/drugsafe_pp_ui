import React, { useMemo, useState } from 'react'
import { Card, Typography, Space, Tag, Button, Collapse } from 'antd'
import { FilePdfOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

type ScreenShellProps = {
  screenId: string
  title?: string
  uiType?: string
  children?: React.ReactNode
  /** Optional explicit PDF url. If omitted, defaults to public/portal/<SCREEN_ID>.pdf */
  pdfUrl?: string
}

export default function ScreenShell({ screenId, title, uiType, children, pdfUrl }: ScreenShellProps) {
  const [showPdf, setShowPdf] = useState(false)

  // 기본 규칙: public/portal/<SCREEN_ID>.pdf
  const resolvedPdfUrl = useMemo(() => {
    // Vite public assets are served under import.meta.env.BASE_URL
    // - dev: '/'
    // - prod (if hosted under subpath): '/drugsafe_pp_ui/' etc.
    const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/');
    const pdfPath = `${base}portal/${screenId}.pdf`;

    console.log("uiType="+uiType+", pdfPath="+pdfPath);

    if (pdfUrl) return pdfUrl;
    if (!screenId) return null;

    return pdfPath;
  }, [pdfUrl, screenId])

  const pdfPanelItems = useMemo(() => {
    if (!resolvedPdfUrl) return []
    return [
      {
        key: 'pdf',
        label: '화면설계(PDF) 미리보기',
        children: (
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 8 }}>
              <a href={resolvedPdfUrl} target="_blank" rel="noreferrer">새 창에서 열기</a>
            </div>
            <iframe
              title={`${screenId}-pdf`}
              src={resolvedPdfUrl}
              style={{ width: '100%', height: 820, border: '1px solid #e5e7eb', borderRadius: 8 }}
            />
          </div>
        ),
      },
    ]
  }, [resolvedPdfUrl, screenId])

  return (
    <div style={{ padding: 16 }}>
      <Card>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Space wrap align="center">
            <Title level={4} style={{ margin: 0 }}>{title}</Title>
            <Tag color="blue">{screenId}</Tag>
            <Tag>{uiType}</Tag>

            {resolvedPdfUrl ? (
              <Button
                size="small"
                icon={<FilePdfOutlined />}
                onClick={() => setShowPdf((v) => !v)}
              >
                {showPdf ? 'PDF 닫기' : 'PDF 보기'}
              </Button>
            ) : null}
          </Space>

          <Text type="secondary">
            이 화면은 PDF 화면설계 기반으로 자동 생성된 템플릿입니다. 필드/컬럼 정의를 채워서 구현을 완료하세요.
          </Text>

          {resolvedPdfUrl && showPdf ? (
            <Collapse defaultActiveKey={['pdf']} items={pdfPanelItems} />
          ) : null}
        </Space>
      </Card>

      <div style={{ height: 12 }} />
      {children}
    </div>
  )
}
