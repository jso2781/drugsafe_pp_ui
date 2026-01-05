import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Button, Card, Input, Menu, Pagination, Select, Space, Table, Typography } from 'antd'
import PageTitle from '@/components/common/PageTitle'
import type { ColumnsType } from 'antd/es/table'
import { fetchNoticeList } from '@/features/notice/noticeThunks'
import { Notice } from '@/features/notice/noticeTypes'
import DepsLocation from "@/components/common/DepsLocation"														   
import { Session } from 'inspector'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
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

  // # 추가: 메뉴 접힘 상태 관리
  const [collapsed, setCollapsed] = useState(false);												
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

  const sideItems = useMemo(() => [
      { key: '/notice', label: '공지사항' },
      { key: '/jobs', label: '채용게시판', disabled: true },
      {
        key: 'centers_group',
        label: '지역의약품안전센터',
        children: [
          { 
            key: 'https://nedrug.mfds.go.kr/cntnts/181', 
            label: '하위메뉴3-1',
          },
          { 
            key: 'https://nedrug.mfds.go.kr/bbs/125', 
            label: '하위메뉴3-2',
          },
        ],
      },
      { key: '/faq', label: 'FAQ', disabled: true },
      { key: '/qna', label: '고객문의', disabled: true }
  ], [])

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
      { title: '번호', dataIndex: 'no', key: 'no', width: 90, align: 'center' },
      {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
        render: (v, row) => (
          <a
            className="ds-board-link"
            onClick={(e) => {
              e.preventDefault()
              navigate(`/ko/notice/${row.id}?page=${pageIndex}`)
            }}
            href={`/ko/notice/${row.id}`}
          >
            {v}
          </a>
        ),
      },
      { title: '작성자', dataIndex: 'writer', key: 'writer', width: 90, align: 'center' },
      { title: '등록일', dataIndex: 'date', key: 'date', width: 90, align: 'center' },
      { title: '조회수', dataIndex: 'views', key: 'views', width: 70, align: 'center' },
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
    <div className="page_layout notice_page">
      <div className="sub_container">
        <div className="content_wrap">
									 
          {/* lnb :: s */}
          <div className={`lnb_wrap ${collapsed ? 'is-collapsed' : ''}`}>
            <div className="lnb_menu">
              <h2 className="lnb_tit">
                {/* 접혔을 때는 텍스트 숨김 */}
                {!collapsed && <span>알림마당</span>}
                
                {/* 햄버거 버튼 추가 */}
                <Button 
                  type="text" 
                  onClick={() => setCollapsed(!collapsed)} 
                  className="btn_toggle"
                  // 아이콘은 antd icons 사용 (MenuFoldOutlined, MenuUnfoldOutlined)
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                />
              </h2>
              <div className="lnb_list">
                <Menu
                  className="side-menu"
                  mode="inline"
                  inlineCollapsed={collapsed} // 접힘 상태 적용
                  selectedKeys={[location.pathname]}
                  items={sideItems}
                  onClick={(e) => {
                    if (e.key.startsWith('http')) {
                      window.open(e.key, '_blank');
                      return;
                    }
                    if (e.key.startsWith('/ko')) {
                      navigate(e.key);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {/* lnb :: e */}

          {/* sub content :: s */}
          <div className="sub_content">
            <DepsLocation></DepsLocation>
            <div className="content_view" id="content">
              <div className="board-search">
                <Space>
                  <Select value={searchCnd} onChange={setSearchCnd} style={{ width: 140 }}>
                    <Option value="title">제목</Option>
                    <Option value="content">내용</Option>
                  </Select>
                  <Input
                    value={searchWrd}
                    onChange={(e) => setSearchWrd(e.target.value)}
                    onPressEnter={onSearch}
                    placeholder="검색어"
                    style={{ width: 260 }}
                  />
                  <Button type="primary" onClick={onSearch}>
                    검색
                  </Button>
                </Space>
              </div>
              <div className="board-top">
                <Text className="board_count">
                  검색결과 <Text className="count">{sampleNotices.length ?? totalCount ?? dataSource.length}</Text>개의 게시물이 있습니다
                  {totalCount ? (
                    <>
                      {' '}| page <Text strong>{pageIndex}</Text>/{Math.max(1, Math.ceil(totalCount / 10))}
                    </>
                  ) : null}
                </Text>
              </div>

              <Card className="board-list" bodyStyle={{ padding: 0 }}>
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  loading={loading}
                  pagination={false}
                  size="middle"
                />
											 
									   
				  
				
              </Card>

              <div className="board-bottom">
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
            </div>
          </div>
          {/* sub content :: e */}
        </div>
      </div>
    </div>
  )
}
