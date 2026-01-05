import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Button, Card, Divider, Menu, Space, Typography } from 'antd'
import PageTitle from '@/components/common/PageTitle'
import { fetchNoticeDetail, fetchNoticeList } from '@/features/notice/noticeThunks'

const { Title, Text, Paragraph } = Typography

export default function NoticeDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('page') || 1)

  const { list, current, loading } = useAppSelector((s) => s.notice)

  useEffect(() => {
    console.log("NoticeDetail useEffect fetchNoticeDetail id="+id+", current=",current);

    // if(String(current.id ?? current.nttId) === String(id)){
    //   return;
    // }

    // 조회된 공지상세내역(current.id)과 조회할 공지상세(id)가 동일하면, 해당 공지상세내역을 두번 조회하지 않음(fetchNoticeDetail)
    const cur: any = current
    const curId = cur?.id ?? cur?.nttId
    if (id && curId != null && String(curId) === String(id)) {
      return;
    }

    if (id) dispatch(fetchNoticeDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    // 목록이 비어있으면 우선 로드 (상세에서 "목록"으로 돌아갈 때 UX 개선)
    if (!list?.length) dispatch(fetchNoticeList({ pageIndex }))
  }, [dispatch, list?.length, pageIndex])

  const sideItems = useMemo(
    () => [
      { key: '/notice', label: 'Announcement' },
      { key: '/jobs', label: 'Job Board', disabled: true },
      { key: '/centers', label: 'Regional Drug Safety Center', disabled: true },
      { key: '/faq', label: 'FAQ', disabled: true },
      { key: '/qna', label: 'Customer Inquiry', disabled: true },
    ],
    [],
  )

  const data = current || list?.find((n) => String(n.id ?? n.nttId) === String(id))
  const html = data?.contentHtml || data?.nttCn || data?.content || ''
  const isHtml = typeof html === 'string' && /<\/?[a-z][\s\S]*>/i.test(html)
  const isPopup = searchParams.get('popup') === '1'

  return (
    <div className="ds-page ds-notice">
      <div className="ds-container">
        {!isPopup && (
          <>
            <Breadcrumb
              className="ds-breadcrumb"
              items={[{ title: 'Home' }, { title: 'Announcement' }, { title: 'NoticeList' }]}
            />

            <PageTitle title="Announcement" subtitle="Announcement" />
          </>
        )}

        <div className={isPopup ? 'ds-page-grid ds-page-grid--popup' : 'ds-page-grid'}>
          {!isPopup && (
            <aside className="ds-side">
              <div className="ds-side-title">Announcement</div>
              <Menu
                className="ds-side-menu"
                mode="inline"
                selectedKeys={['/notice']}
                items={sideItems}
                onClick={(e) => {
                  if (e.key === '/notice') navigate('/en/notice')
                }}
              />
            </aside>
          )}

          <main className="ds-main">
            <Card className="ds-board-view" loading={loading && !data}>
              {data ? (
                <>
                  <div className="ds-board-view-head">
                    <Title level={4} className="ds-board-title">
                      {data.title || data.nttSj || '-'}
                    </Title>
                    <div className="ds-board-meta">
                      <Space size={16} wrap>
                        <Text>
                          <Text type="secondary">Writer</Text> {data.writer || data.frstRegisterNm || '-'}
                        </Text>
                        <Text>
                          <Text type="secondary">Registration Date</Text> {data.date || data.frstRegisterPnttm || '-'}
                        </Text>
                        <Text>
                          <Text type="secondary">Views</Text> {data.views ?? data.inqireCo ?? '-'}
                        </Text>
                      </Space>
                    </div>
                  </div>

                  <Divider />

                  <div className="ds-board-body">
                    {isHtml ? (
                      // 서버에서 내려오는 HTML이 있을 경우
                      <div
                        className="ds-board-html"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    ) : (
                      <Paragraph className="ds-board-text">
                        {html || data.nttCn || 'There is no content.'}
                      </Paragraph>
                    )}
                  </div>

                  {Array.isArray(data.attachments) && data.attachments.length ? (
                    <>
                      <Divider />
                      <div className="ds-board-attach">
                        <Text strong>Attachment</Text>
                        <ul>
                          {data.attachments.map((a, idx) => (
                            <li key={idx}>
                              <a href={a.url || '#'} onClick={(e) => a.url ? null : e.preventDefault()}>
                                {a.name || a.fileName || 'Attachment'}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : null}

                  <Divider />

                  <div className="ds-board-actions">
                    {isPopup ? (
                      <Button onClick={() => window.close()}>Close</Button>
                    ) : (
                      <Space>
                        <Button
                          onClick={() => navigate(`/en/notice?page=${pageIndex}`)}
                        >
                          List
                        </Button>

                        <Button
                          type="primary"
                          onClick={() => {
                            const url = `/en/notice/${id}/preview?page=${pageIndex}&popup=1`
                            window.open(
                              url,
                              `noticePreview_${id}`,
                              [
                                'width=800',
                                'height=800',
                                'left=120',
                                'top=80',
                                'resizable=yes',
                                'scrollbars=yes',
                                'toolbar=no',
                                'menubar=no',
                                'location=no',
                                'status=no',
                              ].join(',')
                            )
                          }}
                        >
                          Preview
                        </Button>
                      </Space>
                    )}
                  </div>
                </>
              ) : (
                <Paragraph>The post could not be found.</Paragraph>
              )}
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
