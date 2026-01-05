import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Button, Card, Input, Menu, Pagination, Select, Space, Table, Typography } from 'antd'
import PageTitle from '@/components/common/PageTitle'
import type { ColumnsType } from 'antd/es/table'
import { fetchNoticeList } from '@/features/notice/noticeThunks'
import { Notice } from '@/features/notice/noticeTypes'
import { Session } from 'inspector'

const { Text } = Typography
const { Option } = Select

export default function NoticeList() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('page') || 1)

  const { list, totalCount, loading } = useAppSelector((s) => s.notice)

  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'title')
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '')

  useEffect(() => {
    dispatch(fetchNoticeList({ pageIndex, searchCnd, searchWrd }))
  }, [dispatch, pageIndex])

  const sampleNotices = [
    {
      id: 854,
      title: '[수의시담]2026~2027년 마약류통합정보관리센터 정보시스템 운영관리 사업',
      writer: '박혜정',
      date: '2025-12-15',
      views: 26,
    },
    {
      id: 853,
      title: '임상시험용의약품 치료목적사용 상담 및 안내 사업 종료 안내',
      writer: '임상시험',
      date: '2025-12-05',
      views: 46,
    },
    {
      id: 852,
      title: '[입찰공고]2026년 한국의약품안전관리원 정보시스템 통합 운영관리(긴급입찰)',
      writer: '박혜정',
      date: '2025-12-03',
      views: 33,
    },
    {
      id: 851,
      title: '[입찰공고]2026~2027년 마약류통합정보관리센터 정보시스템 운영관리 사업(긴급입찰)',
      writer: '박혜정',
      date: '2025-11-18',
      views: 58,
    },
    {
      id: 850,
      title: '[입찰공고]2026년 의약품통합정보시스템 등 유지보수 사업(긴급입찰)(정정공고)',
      writer: '박혜정',
      date: '2025-11-07',
      views: 757,
    },
    {
      id: 849,
      title: '한국의약품안전관리원 정보시스템 네트워크 중단 작업 안내 (&#039;25.11.7.(금) 19시 ~ 11.8.(토) 12시)',
      writer: '이주아',
      date: '2025-11-06',
      views: 725,
    },
    {
      id: 848,
      title: '2025년 한국의약품안전관리원 포스터·카툰 공모전 수상자 발표',
      writer: '장선주',
      date: '2025-10-31',
      views: 1147,
    },
    {
      id: 847,
      title: '[입찰공고]2025년 SAS 소프트웨어 라이선스 갱신(긴급입찰)',
      writer: '박혜정',
      date: '2025-10-28',
      views: 778,
    },
    {
      id: 846,
      title: '「MFDS 데이터 헌터스」모집',
      writer: '하연경',
      date: '2025-10-20',
      views: 950,
    },
    {
      id: 845,
      title: '임상시험안전지원기관 중앙임상시험심사위원회 안내서',
      writer: '임상시험',
      date: '2025-09-25',
      views: 1301,
    },
  ];

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

  type NoticeRow = {
    key: string
    no: number | string
    id: number | string
    title: string
    writer: string
    date: string
    views: number
  }

  const dataSource = useMemo(() => {
    // 서버에서 오는 필드가 다를 수 있어 공통 형태로 normalize
    // const arr = Array.isArray(list) ? list : []
    const arr = Array.isArray(list) && list.length > 0 ? list : sampleNotices;

    return arr.map((n : Notice, idx) => ({
      key: String(n.id ?? n.nttId ?? idx),
      no: n.no ?? n.nttId ?? (totalCount ? totalCount - ((pageIndex - 1) * arr.length + idx) : idx + 1),
      id: n.id ?? n.nttId ?? String(idx),
      title: n.title ?? n.nttSj ?? '',
      writer: n.writer ?? n.frstRegisterNm ?? '',
      date: n.date ?? n.frstRegisterPnttm ?? '',
      views: n.views ?? n.inqireCo ?? 0,
    }))
  }, [list, pageIndex, totalCount])

  const columns: ColumnsType<NoticeRow> = useMemo(
    () => [
      { title: 'No', dataIndex: 'no', key: 'no', width: 90, align: 'center' },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
        render: (v, row) => (
          <a
            className="ds-board-link"
            onClick={(e) => {
              e.preventDefault()
              navigate(`/en/notice/${row.id}?page=${pageIndex}`)
            }}
            href={`/en/notice/${row.id}`}
          >
            {v}
          </a>
        ),
      },
      { title: 'Writer', dataIndex: 'writer', key: 'writer', width: 90, align: 'center' },
      { title: 'Registration Date', dataIndex: 'date', key: 'date', width: 90, align: 'center' },
      { title: 'Views', dataIndex: 'views', key: 'views', width: 70, align: 'center' },
    ],
    [navigate, pageIndex],
  )

  const onSearch = () => {
    const next = new URLSearchParams()
    next.set('page', '1')
    if (searchCnd) next.set('searchCnd', searchCnd)
    if (searchWrd) next.set('searchWrd', searchWrd)
    setSearchParams(next)
    dispatch(fetchNoticeList({ pageIndex: 1, searchCnd, searchWrd }))
  }

  return (
    <div className="ds-page ds-notice">
      <div className="ds-container">
        <Breadcrumb
          className="ds-breadcrumb"
          items={[{ title: 'Home' }, { title: 'Announcement' }, { title: 'NoticeList' }]}
        />

        <PageTitle title="Announcement" subtitle="Announcement" />

        <div className="ds-page-grid">
          <aside className="ds-side">
            <div className="ds-side-title">Announcement</div>
            <Menu className="ds-side-menu" mode="inline" selectedKeys={['/notice']} items={sideItems} />
          </aside>

          <section className="ds-main">
            <div className="ds-board-top">
              <Text type="secondary">
                There are a total of <Text strong>{sampleNotices.length ?? totalCount ?? dataSource.length}</Text> posts
                {totalCount ? (
                  <>
                    {' '}| page <Text strong>{pageIndex}</Text>/{Math.max(1, Math.ceil(totalCount / 10))}
                  </>
                ) : null}
              </Text>
            </div>

            <Card className="ds-board-list" styles={{body:{ padding: 0 }}}>
              <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
                size="middle"
              />
            </Card>

            <div className="ds-board-bottom">
              <Pagination
                current={pageIndex}
                pageSize={10}
                total={totalCount ?? dataSource.length}
                showSizeChanger={false}
                onChange={(p) => {
                  const next = new URLSearchParams(searchParams)
                  next.set('page', String(p))
                  setSearchParams(next)
                }}
              />
            </div>

            <div className="ds-board-search">
              <Space>
                <Select value={searchCnd} onChange={setSearchCnd} style={{ width: 140 }}>
                  <Option value="title">Title</Option>
                  <Option value="content">Content</Option>
                </Select>
                <Input
                  value={searchWrd}
                  onChange={(e) => setSearchWrd(e.target.value)}
                  onPressEnter={onSearch}
                  placeholder="Search Term"
                  style={{ width: 260 }}
                />
                <Button type="primary" onClick={onSearch}>
                  Search
                </Button>
              </Space>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
