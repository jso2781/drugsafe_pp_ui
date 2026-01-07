import React, { useMemo, useState } from 'react'
import { Card, Input, Space, Tag, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { screens, type ScreenMeta } from '@/screens/meta'

const { Title, Text } = Typography

export default function Screens() {
  const [q, setQ] = useState('')

  const data = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return screens
      .filter((s) => !qq || s.id.toLowerCase().includes(qq) || (s.title || '').toLowerCase().includes(qq))
      .map((s) => ({ key: s.id, ...s })) as Array<ScreenMeta & { key: string }>
  }, [q])

  const columns: ColumnsType<ScreenMeta & { key: string }> = [
    { title: '화면ID', dataIndex: 'id', width: 220, render: (id: string) => <Link to={`/screens/${id}`}>{id}</Link> },
    { title: '화면명', dataIndex: 'title' },
    { title: '유형', dataIndex: 'uiType', width: 120, render: (t: ScreenMeta['uiType']) => <Tag>{t}</Tag> }
  ]

  return (
    <div style={{ padding: 16 }} className="container">
      <Card>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Title level={3} style={{ margin: 0 }}>화면ID 목록</Title>
          <Text type="secondary">PDF 화면설계 기준으로 생성된 화면ID별 컴포넌트 목록입니다.</Text>
          <Input
            placeholder="화면ID 또는 화면명 검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            allowClear
          />
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} />
        </Space>
      </Card>
    </div>
  )
}
