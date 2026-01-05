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
      { key: '/dur/understand', label: 'DUR 이해', disabled: true },
      { key: '/dur/search', label: 'DUR 정보검색', disabled: true },
      { key: '/dur/use', label: '의약품 적정사용정보', disabled: true },
      { key: '/dur/notice', label: '알림 게시판' },
      { key: '/dur/proposal', label: '의견 제안' },
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
          items={[{ title: '홈' }, { title: 'DUR 정보' }, { title: '알림 게시판' }]}
        />

        <PageTitle title="알림 게시판" subtitle="DUR 정보" />

        <div className="ds-page-grid">
          <aside className="ds-side">
            <div className="ds-side-title">DUR 정보</div>
            <Menu className="ds-side-menu" mode="inline" selectedKeys={['/dur/notice']} items={sideItems} />
          </aside>

          <main className="ds-main">
            <Card bodyStyle={{ padding: 16 }}>
              <Text type="secondary">게시글 보기</Text>
              <Divider style={{ margin: '12px 0' }} />

              {!item ? (
                <Empty description="게시글을 찾을 수 없습니다." />
              ) : (
                <>
                  <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                    제목 <Text style={{ fontWeight: 600 }}>{item.title}</Text>
                  </Title>

                  <Space size={16} wrap>
                    <Text>
                      작성자 <Text strong>{item.writer}</Text>
                    </Text>
                    <Text>
                      등록일 <Text strong>{item.date}</Text>
                    </Text>
                    <Text>
                      조회수 <Text strong>{item.views}</Text>
                    </Text>
                  </Space>

                  <Divider style={{ margin: '12px 0' }} />

                  {detail?.body ? (
                    <div style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>{detail.body}</div>
                  ) : (
                    <div style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                      (샘플) 본문 내용이 준비되지 않았습니다.
                    </div>
                  )}

                  <Divider style={{ margin: '12px 0' }} />

                  <div style={{ marginBottom: 8 }}>
                    <Text strong>첨부파일</Text>
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
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="첨부파일이 없습니다." />
                  )}
                </>
              )}

              <Divider style={{ margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => navigate('/ko/dur/notice')}>list</Button>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
