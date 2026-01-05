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
      { key: '/notice', label: '공지사항' },
      { key: '/jobs', label: '채용게시판', disabled: true },
      { key: '/centers', label: '지역의약품안전센터', disabled: true },
      { key: '/faq', label: 'FAQ', disabled: true },
      { key: '/qna', label: '고객문의', disabled: true },
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
              items={[{ title: '홈' }, { title: '알림마당' }, { title: '공지사항' }]}
            />

            <PageTitle title="공지사항" subtitle="알림마당" />
          </>
        )}

        <div className={isPopup ? 'ds-page-grid ds-page-grid--popup' : 'ds-page-grid'}>
          {!isPopup && (
            <aside className="ds-side">
              <div className="ds-side-title">알림마당</div>
              <Menu
                className="ds-side-menu"
                mode="inline"
                selectedKeys={['/notice']}
                items={sideItems}
                onClick={(e) => {
                  if (e.key === '/notice') navigate('/ko/notice')
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
                          <Text type="secondary">작성자</Text> {data.writer || data.frstRegisterNm || '-'}
                        </Text>
                        <Text>
                          <Text type="secondary">등록일</Text> {data.date || data.frstRegisterPnttm || '-'}
                        </Text>
                        <Text>
                          <Text type="secondary">조회수</Text> {data.views ?? data.inqireCo ?? '-'}
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
                        {html || data.nttCn || '내용이 없습니다.'}
                      </Paragraph>
                    )}
                  </div>

                  {Array.isArray(data.attachments) && data.attachments.length ? (
                    <>
                      <Divider />
                      <div className="ds-board-attach">
                        <Text strong>첨부파일</Text>
                        <ul>
                          {data.attachments.map((a, idx) => (
                            <li key={idx}>
                              <a href={a.url || '#'} onClick={(e) => a.url ? null : e.preventDefault()}>
                                {a.name || a.fileName || '첨부파일'}
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
                      <Button onClick={() => window.close()}>닫기</Button>
                    ) : (
                      <Space>
                        <Button
                          onClick={() => navigate(`/ko/notice?page=${pageIndex}`)}
                        >
                          목록
                        </Button>

                        <Button
                          type="primary"
                          onClick={() => {
                            const url = `/ko/notice/${id}/preview?page=${pageIndex}&popup=1`
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
                          미리보기
                        </Button>
                      </Space>
                    )}
                  </div>
                </>
              ) : (
                <Paragraph>게시글을 찾을 수 없습니다.</Paragraph>
              )}
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
