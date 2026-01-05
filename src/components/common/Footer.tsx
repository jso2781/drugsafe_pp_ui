import { useMemo } from 'react'
import { Layout, Row, Col, Space, Typography, Divider } from 'antd'
import { Link } from 'react-router-dom'
import RelatedSites from './RelatedSites';
import { useTranslation } from 'react-i18next'

const { Text, Link: AntLink } = Typography;

type TKey =
  | 'cctvPolicy'
  | 'rejectUnAuthorizedEmail'
  | 'directions'
  | 'privacyPolicy'
  | 'termsOfUse'
  | 'youTube'
  | 'instagram'
  | 'blog'
;

// ✅ 배열에는 번역된 문자열(label)이 아니라 "번역 키(labelKey)"만 넣기
const FOOTER_INFO_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  {
    key: 'cctv',
    labelKey: 'cctvPolicy',
    href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovImgInform.do',
  },
  {
    key: 'email-deny',
    labelKey: 'rejectUnAuthorizedEmail',
    href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovDenialEmailCollect.do',
  },
  {
    key: 'location',
    labelKey: 'directions',
    href: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do',
  },
];

const FOOTER_LEGAL_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  {
    key: 'privacy',
    labelKey: 'privacyPolicy',
    href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovPrivacyAgreement.do',
  },
  {
    key: 'terms',
    labelKey: 'termsOfUse',
    href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovUserAgreement.do',
  },
];

const FOOTER_SNS_LINKS: Array<{ key: string; labelKey: TKey; href: string; className?: string }> = [
  {
    key: 'youtube',
    labelKey: 'youTube',
    href: 'https://www.youtube.com/@drugsafe_official/featured',
    className: 'sns_youtube',
  },
  {
    key: 'instagram',
    labelKey: 'instagram',
    href: 'https://www.instagram.com/drugsafe_official/',
    className: 'sns_instagram',
  },
  {
    key: 'blog',
    labelKey: 'blog',
    href: 'https://blog.naver.com/drugsafe_official',
    className: 'sns_blog',
  },
];

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <RelatedSites />
      <div className="container">
        <Row align="middle" justify="space-between" gutter={[12, 12]} className="footer_logo">
          <Col>
            <Link to="/" aria-label={t("kidsHomeAria")}>
              <img
                src="/img/footer_logo.png"
                alt={`KIDS ${t("kidsName")}`}
                style={{
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Col>
        </Row>

        {/* 주소 , 정책 링크 */}        
        <Row gutter={[12, 12]} className="footer_corporate_info">
          <Col style={{ display: 'flex', flexDirection: 'column' }} className="info_txt">
            <Text className="address">{t("kidsAddress")}</Text>
            <Text>{`${t("bizRegNo")} 101-82-21134`}</Text>
            <Text>{`${t("mainTel")} 02-2172-6700`}</Text>
            <Text>{`${t("fax")} 02-2172-6701`}</Text>
          </Col>
          <Col style={{ display: 'flex', flexDirection: 'column' }} className="info_link">
            <Space size={12} wrap>
              {FOOTER_INFO_LINKS.map((item) => (
                <AntLink
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(item.labelKey)}
                </AntLink>
              ))}
            </Space>
            <Space size={12} wrap>
              {FOOTER_LEGAL_LINKS.map((item) => (
                <AntLink
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(item.labelKey)}
                </AntLink>
              ))}
            </Space>
          </Col>
        </Row>

        {/* SNS 링크 */}
        <Row className="footer_sns_link">
          <Col>
            <Space size={12} wrap>
              {FOOTER_SNS_LINKS.map((item) => (
                <AntLink
                  key={item.key}
                  href={item.href}
                  // className={item.className}
                  className={`sns_item ${item.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t(item.labelKey)}</span>
                </AntLink>
              ))}
            </Space>
          </Col>
        </Row>

        {/* 정책 링크 , Copyright*/}
        <Row gutter={[12, 8]} className="footer_meta_info">
          <Col flex="auto">
            <Space size={12} wrap>
              {FOOTER_LEGAL_LINKS.map((item) => (
                <AntLink
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(item.labelKey)}
                </AntLink>
              ))}
            </Space>
          </Col>
          <Col xs={24} md={24} className="copyright">
            <Text>
              Copyright © Korea Institute of Drug Safety &amp; Risk Management. All Rights Reserved.
            </Text>
          </Col>

          {/* (옵션) 데모/개발용 표기 원하면 유지 */}
          <Col xs={24}>
            <Text type="secondary">© {year}</Text>
          </Col>
        </Row>

      </div>
    </footer>
  )
}