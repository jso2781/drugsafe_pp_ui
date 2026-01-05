import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, Card, Menu, Select, Input, Button, Space, Typography, message } from 'antd'
import PageTitle from '@/components/common/PageTitle'
import AgGridTable from '@/components/grid/AgGridTable'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { durNoticeListMock, type DurNoticeListItem } from './durNoticeMock'

const { Text } = Typography
const { Option } = Select

/**
 * DUR 정보 > 알림 게시판
 * - 원본 화면: https://www.drugsafe.or.kr/iwt/ds/ko/bbs/EgovBbs.do?bbsId=BBSMSTR_000000000101
 */
export default function DurNoticeList() {
  const navigate = useNavigate()
  const [searchCnd, setSearchCnd] = useState('title')
  const [searchWrd, setSearchWrd] = useState('')

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

  const sampleRows = useMemo(() => durNoticeListMock, [])

  const filteredRows = useMemo(() => {
    const q = searchWrd.trim()
    if (!q) return sampleRows
    const key = searchCnd === 'content' ? 'title' : 'title'
    return sampleRows.filter((r) => String(r[key] ?? '').includes(q))
  }, [sampleRows, searchCnd, searchWrd])

  const columnDefs = useMemo<ColDef<DurNoticeListItem>[]>(
    () => [
      { headerName: '번호', field: 'no', width: 90, cellStyle: { textAlign: 'center' }, sort: 'desc' },
      {
        headerName: '제목',
        field: 'title',
        minWidth: 420,
        cellRenderer: (p: ICellRendererParams<DurNoticeListItem>) => {
          const v = p.value ?? ''
          return (
            <a className="ds-board-link" style={{display:'inline-block', maxWidth:'100%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} onClick={(e) => {e.preventDefault()}}>
              {String(v).replaceAll('<', '&lt;').replaceAll('>', '&gt;')}
            </a>
          )
        },
      },
      { headerName: '작성자', field: 'writer', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: '등록일', field: 'date', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: '조회수', field: 'views', width: 120, cellStyle: { textAlign: 'center' } },
    ],
    [],
  )

  const totalCount = sampleRows.length // 원본 화면의 총 게시물 수 표기를 참고한 예시 ex) old 113
  const pageIndex = 1
  const totalPages = 12

  const onSearch = () => {
    message.info('샘플 화면입니다. (검색은 샘플 데이터에서만 동작)')
  }

  return (
    <div className="ds-page ds-notice ds-dur-notice">
      <div className="ds-container">
        <Breadcrumb className="ds-breadcrumb" items={[{ title: '홈' }, { title: 'DUR 정보' }, { title: '알림 게시판' }]} />

        <PageTitle title="알림 게시판" subtitle="DUR 정보" />

        <div className="ds-page-grid">
          <aside className="ds-side">
            <div className="ds-side-title">DUR 정보</div>
            <Menu className="ds-side-menu" mode="inline" selectedKeys={['/dur/notice']} items={sideItems} />
          </aside>

          <main className="ds-main">
            <div className="ds-board-top">
              <Text type="secondary">
                총 <Text strong>{totalCount}</Text>개 의 게시물이 있습니다 | page <Text strong>{pageIndex}</Text>/{totalPages}
              </Text>
            </div>

            <Card className="ds-board-list" styles={{ body: { padding: 12 } }}>
              <AgGridTable
                rowData={filteredRows}
                columnDefs={columnDefs}
                height={520}
                onRowClicked={(e) => {
                  if (e?.data?.id) navigate(`/ko/dur/notice/${e.data.id}`)
                }}
              />
            </Card>

            <div className="ds-board-search">
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
                  style={{ width: 320 }}
                  allowClear
                />
                <Button type="primary" onClick={onSearch}>
                  검색
                </Button>
              </Space>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
