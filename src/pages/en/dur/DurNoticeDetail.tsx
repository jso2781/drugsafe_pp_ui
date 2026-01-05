import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb, Card, Menu, Button, Space, Typography, Divider, List, Empty } from 'antd'
import PageTitle from '@/components/common/PageTitle'
import { durNoticeListMock, durNoticeDetailMockById } from './durNoticeMock'

const { Text, Title } = Typography

/**
 * DUR 정보 > 알림 게시판 > 상세
 * - 참조 화면: https://www.drugsafe.or.kr/iwt/ds/ko/bbs/EgovBbs.do?bbsId=BBSMSTR_000000000101&nttId=5154...
 */
export default function DurNoticeDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const sideItems = useMemo(
    () => [
      { key: '/dur/understand', label: 'Understanding DUR', disabled: true },
      { key: '/dur/search', label: 'DUR Information Search', disabled: true },
      { key: '/dur/use', label: 'Information on appropriate use of medicines', disabled: true },
      { key: '/dur/notice', label: 'Notification Board' },
      { key: '/dur/proposal', label: 'Suggestions' },
    ],
    [],
  )

  console.log("DurNoticeDetail DurNoticeList에서 선택된 durNotice의 id="+id);
  const item = useMemo(() => durNoticeListMock.find((r) => String(r.id) === String(id)), [id])
  const detail = useMemo(() => durNoticeDetailMockById?.[String(id)] ?? null, [id])

  return (
    <div className="ds-page ds-notice ds-dur-notice">
      <div className="ds-container">
        <Breadcrumb
          className="ds-breadcrumb"
          items={[{ title: 'Home' }, { title: 'DUR information' }, { title: 'Notification Board' }]}
        />

        <PageTitle title="Notification Board" subtitle="DUR information" />

        <div className="ds-page-grid">
          <aside className="ds-side">
            <div className="ds-side-title">DUR information</div>
            <Menu className="ds-side-menu" mode="inline" selectedKeys={['/dur/notice']} items={sideItems} />
          </aside>

          <main className="ds-main">
            <Card bodyStyle={{ padding: 16 }}>
              <Text type="secondary">View post</Text>
              <Divider style={{ margin: '12px 0' }} />

              {!item ? (
                <Empty description="The post could not be found." />
              ) : (
                <>
                  <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                    Title <Text style={{ fontWeight: 600 }}>{item.title}</Text>
                  </Title>

                  <Space size={16} wrap>
                    <Text>
                      Writer <Text strong>{item.writer}</Text>
                    </Text>
                    <Text>
                      Registration Date <Text strong>{item.date}</Text>
                    </Text>
                    <Text>
                      Views <Text strong>{item.views}</Text>
                    </Text>
                  </Space>

                  <Divider style={{ margin: '12px 0' }} />

                  {detail?.body ? (
                    <div style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>{detail.body}</div>
                  ) : (
                    <div style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                      (Sample) The main text is not ready.
                    </div>
                  )}

                  <Divider style={{ margin: '12px 0' }} />

                  <div style={{ marginBottom: 8 }}>
                    <Text strong>Attachment</Text>
                  </div>

                  {detail?.attachments?.length ? (
                    <List
                      size="small"
                      bordered
                      dataSource={detail.attachments}
                      renderItem={(f) => (
                        <List.Item>
                          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Text>{f.name}</Text>
                            <Text type="secondary">[{f.size}]</Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no attachments." />
                  )}
                </>
              )}

              <Divider style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => navigate('/en/dur/notice')}>List</Button>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
