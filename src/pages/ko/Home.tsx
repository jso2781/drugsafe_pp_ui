import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Input, List, Row, Space, Tabs, Typography } from 'antd'
import { RightOutlined, SearchOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function Home() {
  const navigate = useNavigate()

  const systemCards = useMemo(
    () => [
      {
        title: '마약류통합관리시스템',
        url: 'https://www.nims.or.kr',
        desc:
          '한국의약품안전관리원은 마약류관리에 관한 법률에 따라 마약류통합정보관리센터로 지정되었습니다.',
      },
      {
        title: '의약품 통합정보시스템',
        url: 'https://nedrug.mfds.go.kr',
        desc:
          '약사법에 따라 식품의약품안전처로부터 의약품통합정보시스템을 위탁받아 운영하고 있습니다.',
      },
      {
        title: '첨단바이오의약품 장기추적조사 시스템',
        url: 'https://ltfu.mfds.go.kr',
        desc:
          '첨단재생바이오법에 따라 첨단바이오의약품 규제과학센터로 지정되어 운영합니다.',
      },
    ],
    []
  )

  const serviceShortcuts = useMemo(
    () => [
      { title: '국내이상사례보고', url: 'https://kaers.drugsafe.or.kr' },
      { title: '국외이상사례보고', url: 'https://www.drugsafe.or.kr' },
      { title: '의약품 부작용 피해구제', url: 'https://nedrug.mfds.go.kr' },
      { title: '안전정보공개', url: 'https://open.drugsafe.or.kr' },
      { title: '병원자료 분석네트워크 (MOA)', url: 'https://moa.drugsafe.or.kr' },
      { title: 'APEC 약물감시 전문교육훈련', url: 'https://kidscoe.drugsafe.or.kr' },
      { title: '의약품 안전관리책임자 교육', url: 'https://pvtraining.drugsafe.or.kr' },
    ],
    []
  )

  const snsTabs = useMemo(
    () => [
      {
        key: 'youtube',
        label: '유튜브',
        items: [
          { title: '장애인을 위한 의약품·의약외품 표시 제도 및 서비스', url: 'https://youtu.be' },
          { title: '열탈진과 열사병, 어떻게 다를까요?', url: 'https://youtu.be' },
          { title: '자라나라 머리머리! 두피 건강 꽉! 잡아요!', url: 'https://youtu.be' },
          { title: '간염의 A, B, C!', url: 'https://youtu.be' },
        ],
      },
      {
        key: 'insta',
        label: '인스타그램',
        items: [
          { title: '포스터·카툰 공모전 개최', url: 'https://www.instagram.com' },
          { title: '집중호우 상황별 행동수칙', url: 'https://www.instagram.com' },
          { title: '폭염대비 온열질환 예방수칙', url: 'https://www.instagram.com' },
          { title: '마약류 식욕억제제, 올바르게 사용하는 법', url: 'https://www.instagram.com' },
        ],
      },
      {
        key: 'blog',
        label: '블로그',
        items: [
          { title: '의약품 부작용 피해구제 감동사례 2탄', url: 'https://blog.naver.com' },
          { title: '첨단바이오 국내동향', url: 'https://blog.naver.com' },
          { title: '병원에서 사용하는 약물은 어떻게 감시되고 있을까?', url: 'https://blog.naver.com' },
          { title: '동물용 마약류의 범죄목적 사용 장면', url: 'https://blog.naver.com' },
        ],
      },
    ],
    []
  )

  const notices = useMemo(
    () => [
      { title: '[입찰공고] 2026년 정보시스템 통합 운영관리(긴급입찰)', date: '2025-12-03' },
      { title: '임상시험용의약품 치료목적사용 상담 및 안내 사업 종료 안내', date: '2025-12-05' },
      { title: '[수의시담] 2026~2027년 마약류통합정보관리센터 정보시스템 운영관리 사업', date: '2025-12-15' },
    ],
    []
  )

  return (
    <div className="ds-home">
      <section className="ds-hero ds-fullbleed">
        <div className="ds-container ds-hero__inner">
          <div className="ds-hero__copy">
            <Title level={2} style={{ margin: 0 }}>
              의약품 안전관리로 국민을 건강하게
            </Title>
            <Paragraph className="ds-hero__subtitle">
              국민의 건강과 안전을 확보하고 국제적 수준의 안전관리체계를 마련하는 공공기관의 사명과 책임을 다하겠습니다.
            </Paragraph>

            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Input.Search
                size="large"
                placeholder="검색"
                enterButton
                prefix={<SearchOutlined />}
                onSearch={(q) => navigate(`/ko/search?q=${encodeURIComponent(q)}`)}
              />
              <Space wrap>
                <Button type="primary" onClick={() => navigate('/ko/notice')}>
                  공지사항
                </Button>
                <Button onClick={() => navigate('/ko/board')}>게시판</Button>
              </Space>
            </Space>
          </div>

          <div className="ds-hero__panel" aria-hidden>
            <div className="ds-hero__panel-card">
              <Text strong>주요 서비스</Text>
              <div className="ds-hero__panel-grid">
                {serviceShortcuts.slice(0, 6).map((s) => (
                  <a key={s.title} className="ds-chip" href={s.url} target="_blank" rel="noreferrer">
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-fullbleed">
        <div className="ds-container">
          <Row gutter={[16, 16]}>
            {systemCards.map((c) => (
              <Col key={c.title} xs={24} md={8}>
                <Card
                  title={c.title}
                  className="ds-card"
                  actions={[
                    <a key="more" href={c.url} target="_blank" rel="noreferrer">
                      자세히보기 <RightOutlined />
                    </a>,
                  ]}
                >
                  <Paragraph style={{ marginBottom: 0 }}>{c.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="ds-section ds-fullbleed">
        <div className="ds-container">
          <div className="ds-section__head">
            <Title level={4} style={{ margin: 0 }}>
              한국의약품안전관리원 제공 서비스 바로가기
            </Title>
            <Paragraph style={{ margin: 0, color: 'var(--muted)' }}>
              주요 서비스를 안내해 드립니다.
            </Paragraph>
          </div>

          <Row gutter={[12, 12]}>
            {serviceShortcuts.map((s) => (
              <Col key={s.title} xs={12} md={8} lg={6}>
                <a className="ds-shortcut" href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                  <RightOutlined />
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="ds-section ds-fullbleed">
        <div className="ds-container">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card className="ds-card" title="한국의약품안전관리원 #누리소통망">
                <Tabs
                  items={snsTabs.map((t) => ({
                    key: t.key,
                    label: t.label,
                    children: (
                      <List
                        dataSource={t.items}
                        renderItem={(item) => (
                          <List.Item>
                            <a href={item.url} target="_blank" rel="noreferrer">
                              {item.title}
                            </a>
                          </List.Item>
                        )}
                      />
                    ),
                  }))}
                />
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card
                className="ds-card"
                title="공지사항"
                extra={
                  <Button type="link" onClick={() => navigate('/ko/notice')}>
                    더보기
                  </Button>
                }
              >
                <List
                  dataSource={notices}
                  renderItem={(n) => (
                    <List.Item>
                      <div className="ds-notice-row">
                        <span className="ds-notice-title">{n.title}</span>
                        <span className="ds-notice-date">{n.date}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  )
}
