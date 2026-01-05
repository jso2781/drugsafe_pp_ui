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
        title: 'Integrated Narcotics Management System',
        url: 'https://www.nims.or.kr',
        desc:
          'The Korea Institute of Drug Safety & Risk Management has been designated as the Integrated Narcotics Information Management Center in accordance with the Act on the Control of Narcotics.',
      },
      {
        title: 'Integrated Drug Information System',
        url: 'https://nedrug.mfds.go.kr',
        desc:
          'This system is operated under delegation from the Ministry of Food and Drug Safety in accordance with the Pharmaceutical Affairs Act.',
      },
      {
        title: 'Advanced Biopharmaceutical Long-term Follow-up System',
        url: 'https://ltfu.mfds.go.kr',
        desc:
          'This system is operated as the Regulatory Science Center for Advanced Biopharmaceuticals in accordance with the Act on Advanced Regenerative Medicine and Advanced Biopharmaceuticals.',
      },
    ],
    []
  )

  const serviceShortcuts = useMemo(
    () => [
      { title: 'Domestic Adverse Event Reporting', url: 'https://kaers.drugsafe.or.kr' },
      { title: 'International Adverse Event Reporting', url: 'https://www.drugsafe.or.kr' },
      { title: 'Drug Adverse Reaction Relief Program', url: 'https://nedrug.mfds.go.kr' },
      { title: 'Safety Information Disclosure', url: 'https://open.drugsafe.or.kr' },
      { title: 'Medical Data Analysis Network (MOA)', url: 'https://moa.drugsafe.or.kr' },
      { title: 'APEC Pharmacovigilance Training Program', url: 'https://kidscoe.drugsafe.or.kr' },
      { title: 'Drug Safety Officer Training', url: 'https://pvtraining.drugsafe.or.kr' },
    ],
    []
  )

  const snsTabs = useMemo(
    () => [
      {
        key: 'youtube',
        label: 'YouTube',
        items: [
          {
            title: 'Drug & Quasi-drug Labeling and Services for Persons with Disabilities',
            url: 'https://youtu.be',
          },
          {
            title: 'Heat Exhaustion vs. Heat Stroke: What’s the Difference?',
            url: 'https://youtu.be',
          },
          {
            title: 'Grow Your Hair! Take Care of Your Scalp Health!',
            url: 'https://youtu.be',
          },
          {
            title: 'Hepatitis A, B, and C Explained',
            url: 'https://youtu.be',
          }
        ],
      },
      {
        key: 'insta',
        label: 'Instagram',
        items: [
          { title: 'Poster & Cartoon Contest Announcement', url: 'https://www.instagram.com' },
          { title: 'Heavy Rain Emergency Action Guidelines', url: 'https://www.instagram.com' },
          { title: 'Heatwave Safety Tips to Prevent Heat-related Illness', url: 'https://www.instagram.com' },
          { title: 'How to Properly Use Narcotic Appetite Suppressants', url: 'https://www.instagram.com',}
        ],
      },
      {
        key: 'blog',
        label: 'Blog',
        items: [
          { title: 'Touching Stories from the Drug Adverse Reaction Relief Program (Part 2)', url: 'https://blog.naver.com' },
          { title: 'Domestic Trends in Advanced Biopharmaceuticals', url: 'https://blog.naver.com' },
          { title: 'How Are Drugs Used in Hospitals Monitored?', url: 'https://blog.naver.com' },
          { title: 'Criminal Misuse of Veterinary Narcotics', url: 'https://blog.naver.com' }
        ],
      },
    ],
    []
  )

  const notices = useMemo(
    () => [
      { title: '[Bid Notice] Integrated Information System Operation & Maintenance for 2026 (Emergency Bid)', date: '2025-12-03' },
      { title: 'Notice of Termination: Consultation & Guidance Program for Compassionate Use of Investigational Drugs', date: '2025-12-05' },
      { title: '[Veterinary Tender] 2026–2027 Integrated Narcotics Information Management Center System Operation Project', date: '2025-12-15' }
    ],
    []
  )

  return (
    <div className="ds-home">
      <section className="ds-hero ds-fullbleed">
        <div className="ds-container ds-hero__inner">
          <div className="ds-hero__copy">
            <Title level={2} style={{ margin: 0 }}>
              Promoting Public Health Through Drug Safety Management
            </Title>
            <Paragraph className="ds-hero__subtitle">
              We are committed to fulfilling our mission and responsibility as a public institution to safeguard public health and safety and to establish an internationally recognized safety management system.
            </Paragraph>

            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Input.Search
                size="large"
                placeholder="Search"
                enterButton
                prefix={<SearchOutlined />}
                onSearch={(q) => navigate(`/en/search?q=${encodeURIComponent(q)}`)}
              />
              <Space wrap>
                <Button type="primary" onClick={() => navigate('/en/notice')}>
                  Announcement
                </Button>
                <Button onClick={() => navigate('/en/board')}>Bulletin Board</Button>
              </Space>
            </Space>
          </div>

          <div className="ds-hero__panel" aria-hidden>
            <div className="ds-hero__panel-card">
              <Text strong>Key Services</Text>
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
                      View Details <RightOutlined />
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
              Quick Access to Services Provided by KIDS
            </Title>
            <Paragraph style={{ margin: 0, color: 'var(--muted)' }}>
              We introduce our key services.
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
              <Card className="ds-card" title="Korea Institute of Drug Safety & Risk Management (KIDS) #Social Media">
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
                title="Announcement"
                extra={
                  <Button type="link" onClick={() => navigate('/en/notice')}>
                    View More
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
