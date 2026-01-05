import { useTranslation } from 'react-i18next'
import i18n, { LOCALE_KEY } from '@/i18n/i18n'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Input, Row, Col, Space, Typography, Divider, Button, Drawer } from 'antd'
import {
  SearchOutlined,
  LoginOutlined,
  UserAddOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import SkipNavigation from './SkipNavigation'
import { getLangFromPathname, langPath } from "@/routes/lang";

const { Text, Link: AntLink, Title } = Typography

type SitemapLinkItem = {
  key: string
  label: React.ReactNode
  href?: string
  internal?: boolean
  children?: SitemapLinkItem[]
}

type SitemapItemProps = {
  item: SitemapLinkItem
}

type SitemapSection = {
  key: string
  title: string
  items: SitemapLinkItem[]
}

// drugsafe.or.kr(메인) 푸터의 “전체 사이트맵(닫기)” 확장 영역 형태를 참고해
// Drawer로 전체 메뉴를 보여주도록 구성했습니다.
const SITEMAP_SECTIONS : SitemapSection[] = [
  {
    key: 'safety-report',
    title: '의약품 이상사례보고',
    items: [
      {
        key: 'safety-report-online1',
        label: '이상사례보고',
        children: [
          { key: 'safety-report-online11', label: '이상사례 보고란?', href: '#' },
          { key: 'safety-report-online12', label: 'KAERS란?', href: '#' },
        ],
      },
      {
        key: 'safety-report-online2', 
        label: '온라인 보고',
        children: [
          { key: 'safety-report-online21', label: '의약품이상사례', href: '#' },
          { key: 'safety-report-online22', label: '의약외품(생리대 등)', href: 'https://nedrug.mfds.go.kr' },
        ],
      },
      { key: 'safety-report-offline', label: '오프라인 보고', href: '#' },
      { key: 'safety-report-archive', label: '이상사례보고자료실', href: '#' },
      { key: 'safety-report-guide', label: '온라인보고방법 안내', href: '#' },
    ],
  },
  {
    key: 'safety-mgmt',
    title: '의약품 안전관리',
    items: [
      { key: 'safety-terms', label: '약물감시용어', href: '#' },
      { key: 'safety-causality', label: '부작용 인과관계규명', href: '#' },
      { key: 'safety-related', label: '유관기관', href: '#' },
    ],
  },
  {
    key: 'dur',
    title: 'DUR 정보',
    items: [
      { key: 'dur-understand', label: 'DUR 이해', href: '#' },
      {
        key: 'dur-search-room', label: 'DUR 정보검색방',
        children: [
          { key: 'dur-search-room1', label: 'DUR 통합검색', href: '#' },
          { key: 'dur-search-room2', label: '병용금기', href: '#' },
          { key: 'dur-search-room3', label: '특정연령대금기', href: '#' },
          { key: 'dur-search-room4', label: '임부금기', href: '#' },
          { key: 'dur-search-room5', label: '효능군중복주의', href: '#' },
          { key: 'dur-search-room6', label: '용량주의', href: '#' },
          { key: 'dur-search-room7', label: '투여기간주의', href: '#' },
          { key: 'dur-search-room8', label: '노인주의', href: '#' },
          { key: 'dur-search-room9', label: '수유부주의', href: '#' },
        ],
      },
      {
        key: 'dur-appropriate-use', label: '의약품 적정사용 정보방',
        children: [
          { key: 'dur-appropriate-use1', label: '노인 적정사용정보집', href: '#' },
          { key: 'dur-appropriate-use2', label: '소아 적정사용정보집', href: '#' },
          { key: 'dur-appropriate-use3', label: '임부 적정사용정보집', href: '#' },
          { key: 'dur-appropriate-use4', label: '간질환 적정사용정보집', href: '#' },
          { key: 'dur-appropriate-use5', label: '신질환 적정사용정보집', href: '#' },
        ],
      },
      { key: 'dur-notice', label: 'DUR 게시판', href: '/dur/notice', internal: true },
      { key: 'dur-proposal', label: 'DUR 제안', href: '/dur/proposal', internal: true },
    ],
  },
  {
    key: 'relief',
    title: '부작용 피해구제',
    items: [
      { key: 'relief-system', label: '제도소개', href: '#' },
      { key: 'relief-apply', label: '피해구제 신청', href: '#' },
      { key: 'relief-news', label: '뉴스/소식', href: '#' },
      { key: 'relief-faq', label: '자주하는 질문', href: 'https://nedrug.mfds.go.kr' },
    ],
  },
  {
    key: 'clinical-trial',
    title: '임상시험안전지원',
    items: [
      { key: 'clinical-trial1', label: '임상시험안전지원기관', href: '#' },
      { key: 'clinical-trial2', label: '협약 안내', href: '#' },
      { key: 'clinical-trial3', label: '중앙IRB신청', href: '#' },
      { key: 'clinical-trial4', label: '임상시험헬프데스크', href: '#' },
      { key: 'clinical-trial5', label: '공지사항', href: '#' },
      { key: 'clinical-trial6', label: '자료실', href: '#' },
    ],
  },
  {
    key: 'notice',
    title: '알림마당',
    items: [
      { key: 'notice-list', label: '공지사항', href: '/notice', internal: true },
      { key: 'notice-jobs', label: '채용게시판', href: '#' },
      {
        key: 'notice-center', 
        label: '지역의약품안전센터',
        children: [
          { key: 'notice-center1', label: '센터안내 및 활동', href: 'https://nedrug.mfds.go.kr' },
          { key: 'notice-center2', label: '지역센터소식', href: 'https://nedrug.mfds.go.kr' },
        ],
      },
      { key: 'notice-faq', label: 'FAQ', href: '#' },
      { key: 'notice-qna', label: '고객문의', href: '#' },
    ],
  },
  {
    key: 'edu',
    title: '교육·홍보',
    items: [
      { key: 'edu-guide',label: '교육 안내', href: '#' },
      {
        key: 'edu-apec', 
        label: 'APEC CoE',
        children: [
          { key: 'edu-apec1', label: 'Save the Date', href: '#' },
          { key: 'edu-apec2', label: 'Training Materials', href: '#' },
        ],
      },
      { key: 'edu-press',label: '보도자료', href: '#' },
      {
        key: 'edu-newsletter', 
        label: '뉴스레터',
        children: [
          { key: 'edu-newsletter1', label: 'KIDS 뉴스레터', href: '#' },
          { key: 'edu-newsletter2', label: '첨단바이오 포커스', href: 'https://ltfu.mfds.go.kr' },
          { key: 'edu-newsletter3', label: '마약류 안전정보지', href: '#' },
        ],
      },
      { key: 'edu-card', label: '카드뉴스', href: '#' },
      { key: 'edu-video', label: '동영상', href: '#' },
      { key: 'edu-archive', label: '자료실', href: '#' },
    ],
  },
  {
    key: 'open',
    title: '정보공개',
    items: [
      {
        key: 'open-info', 
        label: '정보공개',
        children: [
          { key: 'open-info1', label: '업무처리절차', href: '#' },
          { key: 'open-info2', label: '정보공개 청구', href: 'https://open.go.kr' },
          { key: 'open-info3', label: '임직원국외출장', href: '#' },
          { key: 'open-info4', label: '원장 업무추진비 집행내역', href: '#' },
        ],
      },
      { key: 'open-data', label: '공공데이터 개방', href: '#' },
      {
        key: 'open-mgmt',  
        label: '경영공시',
        children: [
          { key: 'open-mgmt1', label: '부패행위 징계현황', href: '#' },
          { key: 'open-mgmt2', label: '징계기준', href: '#' },
          { key: 'open-mgmt3', label: '징계현황', href: '#' },
        ],
      },
      { key: 'open-bizname', label: '사업실명제', href: '#' },
    ],
  },
  {
    key: 'about',
    title: '기관소개',
    items: [
      { key: 'about-greeting', label: '기관장 인사말', href: '#' },
      { key: 'about-former', label: '역대 기관장', href: '#' },
      { key: 'about-history', label: '연혁', href: '#' },
      { key: 'about-vision', label: '비전 및 목표', href: '#' },
      { key: 'about-org', label: '조직도', href: '#' },
      { key: 'about-law', label: '설립근거 및 관련법령', href: '#' },
      { key: 'about-charter', label: '고객헌장', href: '#' },
      { key: 'about-news', label: '우리원동정', href: '#' },
      { key: 'about-ci', label: 'CI소개', href: '#' },
      { key: 'about-character', label: '캐릭터소개', href: '#' },
      {
        key: 'about-ethics', 
        label: '윤리경영',
        children: [{ key: 'about-ethics-clean', label: '클린신고센터', href: '#' }],
      },
      { key: 'about-human', label: '인권경영', href: '#' },
      {
        key: 'about-map', 
        label: '오시는 길',
        href: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do',
      },
    ],
  },
]

function SitemapItem({ item }: SitemapItemProps) {
  const location = useLocation();

  const curLang = useMemo(() => getLangFromPathname(location.pathname), [location.pathname]);
  const to = useMemo(() => (p: string) => langPath(p, curLang), [curLang]);

  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  const internal =
    item.internal || (typeof item.href === 'string' && item.href.startsWith('/'))

  const LinkEl = useMemo(() => {
    if (!item.href || item.href === '#') return null
    if (internal) {
      return (
        <NavLink to={to(item.href)} style={{ color: 'inherit' }}>
          {item.label}
        </NavLink>
      )
    }
    return (
      <AntLink href={to(item.href)} target="_blank" rel="noopener noreferrer">
        {item.label}
      </AntLink>
    )
  }, [internal, item.href, item.label])

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontWeight: 500 }}>{LinkEl ?? <Text>{item.label}</Text>}</div>

      {hasChildren && (
        <div style={{ paddingLeft: 12, marginTop: 6 }}>
          <Space direction="vertical" size={4}>
            {item.children?.map((child) => (
              <div key={child.key} style={{ lineHeight: 1.4 }}>
                <SitemapItem item={child} />
              </div>
            ))}
          </Space>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const curLang = useMemo(() => getLangFromPathname(location.pathname), [location.pathname]);
  const to = useMemo(() => (p: string) => langPath(p, curLang), [curLang]);

  /**************************** 한국어/영어 사이트 변환 설정 시작 *********************/
  const { t } = useTranslation();

  const toggleLang = () => {
    const nextLang = i18n.language === "ko" ? "en" : "ko";

    // 현재 경로에서 lang segment 교체
    const pathSegments = location.pathname.split("/");

    // ['', 'ko', 'home'] 형태라고 가정
    pathSegments[1] = nextLang;

    // 다시 경로 조합
    const nextPath = pathSegments.join("/");

    console.log("Header toggleLang curLang="+i18n.language+", next="+nextLang);

    localStorage.setItem(LOCALE_KEY, nextLang)  // ✅ APP_LOCALE 저장
    i18n.changeLanguage(nextLang);              // ✅ UI 즉시 반영
    navigate(nextPath);                         // ✅ 경로 이동
  }
  /**************************** 한국어/영어 사이트 변환 설정 종료 *********************/

  const menuItems1 = [
    {
      key: 'safety',
      label: t('menuSafety'),
      children: [
        {
          key: 'safety-report',
          label: t('menuSafetyReport'),
          children: [
            { key: 'safety-report-online', label: t('menuSafetyReportOnline') },
            { key: 'safety-report-offline', label: t('menuSafetyReportOffline') },
            { key: 'safety-report-archive', label: t('menuSafetyReportArchive') },
            { key: 'safety-report-guide', label: t('menuSafetyReportGuide') },
          ],
        },
        {
          key: 'safety-mgmt',
          label: t('menuSafetyMgmt'),
          children: [
            { key: 'safety-terms', label: t('menuSafetyTerms') },
            { key: 'safety-causality', label: t('menuSafetyCausality') },
            { key: 'safety-related', label: t('menuSafetyRelated') },
          ],
        },
      ],
    },
    {
      key: 'dur',
      label: t('menuDur'),
      children: [
        { key: 'dur-understand', label: t('menuDurUnderstand') },
        { key: 'dur-search', label: t('menuDurSearch') },
        { key: 'dur-use', label: t('menuDurUse') },
        { key: 'dur-notice', label: <NavLink to={to("/dur/notice")}>{t('menuDurNotice')}</NavLink> },
        { key: 'dur-suggest', label: <NavLink to={to("/dur/proposal")}>{t('menuDurSuggest')}</NavLink> },
      ],
    },
    {
      key: 'relief',
      label: t('menuRelief'),
      children: [
        { key: 'relief-system', label: t('menuReliefSystem') },
        { key: 'relief-apply', label: t('menuReliefApply') },
        { key: 'relief-news', label: t('menuReliefNews') },
        { key: 'relief-faq', label: t('menuReliefFaq') },
      ],
    },
    {
      key: 'clinical-trial',
      label: t('menuClinicalTrial'),
      children: [
        { key: 'clinical-trial1', label: t('menuClinicalTrial1'), href: '#' },
        { key: 'clinical-trial2', label: t('menuClinicalTrial2'), href: '#' },
        { key: 'clinical-trial3', label: t('menuClinicalTrial3'), href: '#' },
        { key: 'clinical-trial4', label: t('menuClinicalTrial4'), href: '#' },
        { key: 'clinical-trial5', label: t('menuClinicalTrial5'), href: '#' },
        { key: 'clinical-trial6', label: t('menuClinicalTrial6'), href: '#' },
      ],
    },
    {
      key: 'notice',
      label: t('menuNotice'),
      children: [
        { key: 'notice-list', label: <NavLink to={to("/notice")}>{t('menuNoticeList')}</NavLink> },
        { key: 'notice-jobs', label: t('menuNoticeJobs') },
        { key: 'notice-center', label: t('menuNoticeCenter') },
        { key: 'notice-faq', label: t('menuNoticeFaq') },
        { key: 'notice-qna', label: t('menuNoticeQna') },
      ],
    },
    {
      key: 'edu',
      label: t('menuEdu'),
      children: [
        { key: 'edu-guide', label: t('menuEduGuide') },
        { key: 'edu-apec', label: t('menuEduApec') },
        { key: 'edu-press', label: t('menuEduPress') },
        { key: 'edu-newsletter', label: t('menuEduNewsletter') },
        { key: 'edu-card', label: t('menuEduCard') },
        { key: 'edu-video', label: t('menuEduVideo') },
        { key: 'edu-archive', label: t('menuEduArchive') },
      ],
    },
    {
      key: 'open',
      label: t('menuOpen'),
      children: [
        { key: 'open-info', label: t('menuOpenInfo') },
        { key: 'open-data', label: t('menuOpenData') },
        { key: 'open-mgmt', label: t('menuOpenMgmt') },
        { key: 'open-bizname', label: t('menuOpenBizname') },
      ],
    },
    {
      key: 'about',
      label: t('menuAbout'),
      children: [
        { key: 'about-greeting', label: t('menuAboutGreeting') },
        { key: 'about-former', label: t('menuAboutFormer') },
        { key: 'about-history', label: t('menuAboutHistory') },
        { key: 'about-vision', label: t('menuAboutVision') },
        { key: 'about-org', label: t('menuAboutOrg') },
        { key: 'about-law', label: t('menuAboutLaw') },
        { key: 'about-charter', label: t('menuAboutCharter') },
        { key: 'about-news', label: t('menuAboutNews') },
        { key: 'about-ci', label: t('menuAboutCi') },
        { key: 'about-character', label: t('menuAboutCharacter') },
        { key: 'about-ethics', label: t('menuAboutEthics') },
        { key: 'about-human', label: t('menuAboutHuman') },
        { key: 'about-map', label: t('menuAboutMap') },
      ],
    },
  ];

  const expertApplyMenuItem = {
    key: 'expert-convert-apply',
    label: <NavLink to={to("/expert/convert/apply")}>{t('usrSwtReg')}</NavLink>, // ✅ 기존 키 (en/ko 모두 존재)
  };

  const expertMyWorkMenuItem = {
    key: 'expert-my-work',
    label: <NavLink to={to("/expert/my-work")}>{t('expertMyWork')}</NavLink>, // ✅ 새 키 추가 필요
  };

  const [userRole, setUserRole] = useState<'GENERAL' | 'EXPERT'>('GENERAL');
  const [keyword, setKeyword] = useState('');
  const [sitemapOpen, setSitemapOpen] = useState(false);

    // - 실제 프로젝트에선 auth store / context / recoil / redux / zustand / query 결과 등으로 대체
  // const userRole = 'GENERAL' // 'GENERAL' | 'EXPERT'
  const isExpert = userRole === 'EXPERT'

  // 권한별 분기
  const menuItems2 = [
    // 필요하면 “전문가” 상위 그룹을 따로 두고 그 안에 넣어도 되고,
    // 지금은 최상위에 단일 메뉴로 추가하는 예시
    ...(isExpert ? [expertMyWorkMenuItem] : []),

    ...menuItems1
  ];

  return (
    <header className="header">
      <SkipNavigation />
      <div className="gov_badge">
        <div className="container">
          <p className="txt">{t("shutcutTitle")}</p>
        </div>
      </div>
      <div className="header_topbar">
        <div className="container">
          <div className="top_links">
              <Space size={8}>
              <Button type="text" size="small" onClick={() => navigate('/screens')}>Screens</Button>
              <Button type="text" size="small" icon={<GlobalOutlined />} onClick={toggleLang}>
                {i18n.language === 'ko' ? 'English' : '한국어'}
              </Button>
            </Space>
          </div>
        </div>
      </div>
      
      <div className="header_menu">
        <div className="container">
          <div className="logo">
            <h1>
              <Link to="/" aria-label={t("kidsHomeAria")}>
                <img src={i18n.language === 'ko' ? '/img/logo.png' : '/img/logo_eng02.png'} alt={`KIDS ${t("kidsName")}`} />
              </Link>
            </h1>
          </div>
          <div className="util_menu">
            <div className="link_list">
              <Space size={8} className="">
                <Button
                  type="text"
                  size="small"
                  className="btn_search"
                  onClick={() => navigate(to('/signup'))}
                >
                  {t("integratedSearch")}
                </Button>
                <Button
                  type="text"
                  size="small"
                  className="btn_signup"
                  onClick={() => navigate(to('/signup'))}
                >
                  {t("signup")}
                </Button>
                {userRole === 'GENERAL' ? 
                  <Button type="text" size="small" className="btn_user_role" onClick={() => navigate(to('/expertapply'))}>
                    {t("usrSwtReg")}
                  </Button> : null
                }
                <Button
                  type="text"
                  size="small"
                  className="btn_login"
                  onClick={() => navigate(to('/login'))}
                >
                  {t("login")}
                </Button>
              </Space>
            </div>
          </div>      
        </div>
      </div>

      <nav className="nav" aria-label="주요 메뉴">
        <div className="container">
        <Menu mode="horizontal" items={menuItems2} selectable={false} className="gnb_list"/>
        <Button type="text" size="small" onClick={() => setSitemapOpen(true)} className="btn_sitemap">
          사이트맵
        </Button>
        </div>
      </nav>

      {/* 확장: 전체 사이트맵(닫기) */}
      <Drawer
        open={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        placement="bottom"
        height="82vh"
        title={
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Space size={12}>
              <Link to="/" aria-label={t("home")}>
                <Text strong style={{ fontSize: 16 }}>
                  KIDS
                </Text>
              </Link>
              <Text type="secondary">{t("allSitemap")}</Text>
            </Space>

            <Space size={8}>
              <Button type="text" onClick={() => setSitemapOpen(false)}>
                {t("close")}
              </Button>
            </Space>
          </div>
        }
        styles={{ body: { paddingTop: 12 } }}
      >
        {/* drugsafe.or.kr의 “로그인/회원가입” 영역을 참고해 Drawer 상단에 배치 */}
        <div style={{ marginBottom: 16 }}>
          <Space size={8} wrap>
            <Button type="primary">
              <NavLink to={to("/login")}>{t("login")}</NavLink>
            </Button>
            <Button>
              <NavLink to={to("/signup")}>{t("signup")}</NavLink>
            </Button>
          </Space>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* 사이트맵 본문: 섹션을 여러 컬럼으로 */}
        <Row gutter={[16, 16]}>
          {SITEMAP_SECTIONS.map((section) => (
            <Col key={section.title} xs={24} sm={12} lg={8}>
              <Title level={5} style={{ marginTop: 0, marginBottom: 10 }}>
                {section.title}
              </Title>
              <div>
                {section.items.map((item) => (
                  <SitemapItem key={item.key} item={item} />
                ))}
              </div>
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: '16px 0' }} />

        <Space size={12} wrap>
          <AntLink href="https://www.drugsafe.or.kr/ko/index.do" target="_blank" rel="noopener noreferrer">
            {t("kidsLink")}
          </AntLink>
          <AntLink href="https://kaers.drugsafe.or.kr/index.do" target="_blank" rel="noopener noreferrer">
            {t("reportLink")}
          </AntLink>
        </Space>
      </Drawer>
    </header>
  )
}
