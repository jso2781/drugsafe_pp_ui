import { useTranslation } from 'react-i18next'
import { LOCALE_KEY } from '@/i18n/i18n'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { MenuProps, Layout, Menu, Input, Row, Col, Space, Typography, Divider, Button, Drawer } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import SkipNavigation from './SkipNavigation'
import { getLangFromPathname, langPath } from "@/routes/lang";
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectMenuList } from '@/features/auth/MenuThunks'
import { clearMenuCache } from '@/features/auth/MenuSlice'
import { RootState } from '@/app/store'
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
    key: 'main-tasks',
    title: '주요 업무',
    items: [
      {
        key: 'safety-report',
        label: '의약품 이상사례보고',
        children: [
          {
            key: 'safety-report-online1',
            label: '이상사례보고',
            children: [
              {
                key: 'safety-report-online11',
                label: '이상사례 보고란?',
                href: '/safety/report1',
                internal: true,
              },
              {
                key: 'safety-report-online12',
                label: 'KAERS란?',
                href: '/safety/report2',
                internal: true,
              },
            ],
          },
          {
            key: 'safety-report-online2',
            label: '온라인 보고',
            children: [
              {
                key: 'safety-report-online21',
                label: '의약품이상사례',
                href: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReport',
              },
              {
                key: 'safety-report-online22',
                label: '의약외품(생리대 등)',
                href: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReportQuasiDrug',
              },
            ],
          },
          {
            key: 'safety-report-offline',
            label: '오프라인 보고',
            href: '/safety/report5',
            internal: true,
          },
          {
            key: 'safety-report-archive',
            label: '이상사례보고자료실',
            href: '/safety/report6',
            internal: true,
          },
          {
            key: 'safety-report-guide',
            label: '온라인보고방법 안내',
            href: '/safety/report7',
            internal: true,
          },
        ],
      },

      {
        key: 'side-effects-report',
        label: '의약품 부작용 보고 자료',
        children: [
          { key: 'side-effects-report1', label: '의약품 부작용 보고1', href: '#' },
          { key: 'side-effects-report2', label: '의약품 부작용 보고2', href: '#' },
          { key: 'side-effects-report3', label: '의약품 부작용 보고3', href: '#' },
        ],
      },

      {
        key: 'safety-mgmt',
        label: '의약품 안전관리',
        children: [
          { key: 'safety-terms', label: '약물감시용어', href: '#' },
          { key: 'safety-causality', label: '부작용 인과관계규명', href: '#' },
          { key: 'safety-related', label: '유관기관', href: '#' },
        ],
      },

      {
        key: 'pharma-linkage-analysis',
        label: '의약품.의료정보.연계분석',
        children: [
          { key: 'pharma-linkage-analysis1', label: '의약품.의료정보.연계분석1', href: '#' },
          { key: 'pharma-linkage-analysis2', label: '의약품.의료정보.연계분석2', href: '#' },
          { key: 'pharma-linkage-analysis3', label: '의약품.의료정보.연계분석3', href: '#' },
        ],
      },

      {
        key: 'dur',
        label: 'DUR 정보',
        children: [
          { key: 'dur-understand', label: 'DUR 이해', href: '#' },
          {
            key: 'dur-search-room',
            label: 'DUR 정보검색방',
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
            key: 'dur-appropriate-use',
            label: '의약품 적정사용 정보방',
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
        label: '부작용 피해구제',
        children: [
          { key: 'relief-system', label: '제도소개', href: '#' },
          { key: 'relief-apply', label: '피해구제 신청', href: '#' },
          { key: 'relief-news', label: '뉴스/소식', href: '#' },
          { key: 'relief-faq', label: '자주하는 질문', href: 'https://nedrug.mfds.go.kr' },
        ],
      },

      {
        key: 'clinical-trial',
        label: '임상시험안전지원',
        children: [
          { key: 'clinical-trial1', label: '임상시험안전지원기관', href: '#' },
          { key: 'clinical-trial2', label: '협약 안내', href: '#' },
          { key: 'clinical-trial3', label: '중앙IRB신청', href: '#' },
          { key: 'clinical-trial4', label: '임상시험헬프데스크', href: '#' },
          { key: 'clinical-trial5', label: '공지사항', href: '#' },
          { key: 'clinical-trial6', label: '자료실', href: '#' },
        ],
      },
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
    key: 'notice',
    title: '기관소식',
    items: [
      { key: 'notice-list', label: '공지사항', href: '/notice', internal: true },
      { key: 'notice-jobs', label: '채용게시판', href: '#' },
      { key: 'notice-faq', label: 'FAQ', href: '#' },
      { key: 'notice-petition', label: '국민신문고', href: '#' },
      { key: 'notice-press', label: '보도자료', href: '#' },
      {
        key: 'notice-newsletter',
        label: '뉴스레터',
        children: [
          { key: 'notice-bio-focus', label: '첨단바이오 포커스', href: 'https://ltfu.mfds.go.kr' },
          { key: 'notice-safe-info', label: '마약류 안전정보지', href: '#' },
          { key: 'notice-leaflet', label: '리플릿', href: '#' },
        ],
      },
      { key: 'notice-card', label: '카드뉴스', href: '#' },
      { key: 'notice-video', label: '동영상', href: '#' },
      { key: 'notice-archive', label: '자료실', href: '#' },
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
      {
        key: 'about-ethics',
        label: '윤리경영',
        children: [{ key: 'about-ethics-clean', label: '클린신고센터', href: '#' }],
      },
      { key: 'about-character', label: '캐릭터소개', href: '#' },
      {
        key: 'about-map',
        label: '오시는 길',
        href: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do',
      },
    ],
  },
] as const;

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

function buildAntdMenuItems(menus: any[], to: (p: string) => string): MenuProps["items"] {
  const byParent = new Map<number | null, any[]>();

  for (const m of menus) {
    const parent = m.upMenuSn ?? null;
    if (!byParent.has(parent)) byParent.set(parent, []);
    byParent.get(parent)!.push(m);
  }

  const sortFn = (a: any, b: any) => (a.menuSeq ?? 0) - (b.menuSeq ?? 0);

  const make = (parent: number | null): MenuProps["items"] => {
    const children = (byParent.get(parent) ?? []).sort(sortFn);

    const createdMenuProps: MenuProps["items"] = children.map((m) => {
      const hasChild = (byParent.get(m.menuSn) ?? []).length > 0;
      const label =
        !hasChild && m.menuUrlAddr
          ? <NavLink to={to(m.menuUrlAddr)}>{m.menuNm}</NavLink>
          : m.menuNm;

      return {
        key: String(m.menuSn ?? m.menuNm),
        label,
        children: hasChild ? make(m.menuSn) : undefined,
      };
    });

    console.log('createdMenuProps for parent', parent, createdMenuProps);

    return createdMenuProps;
  };

  // root 기준이 null인지, 0인지, depLevel===1인지 프로젝트 데이터에 맞춰 조정
  return make(null);
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { list, totalCount } = useAppSelector((s: RootState) => s.menu);

  const curLang = useMemo(() => getLangFromPathname(location.pathname), [location.pathname]);
  const to = useMemo(() => (p: string) => langPath(p, curLang), [curLang]);

  /**************************** 한국어/영어 사이트 변환 설정 시작 *********************/
  const { t, i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    //  언어가 바뀔 때마다 해당 언어 메뉴 재조회
    dispatch(selectMenuList({ langSeCd: i18nInstance.language }));
  }, [dispatch, i18nInstance.language]);

  const toggleLang = () => {
    const nextLang = i18nInstance.language === "ko" ? "en" : "ko";

    // 현재 경로에서 lang segment 교체
    const pathSegments = location.pathname.split("/");

    // ['', 'ko', 'home'] 형태라고 가정
    pathSegments[1] = nextLang;

    // 다시 경로 조합
    const nextPath = pathSegments.join("/");

    // 토글할 때마다 메뉴 목록을 무조건 다시 불러오게 캐시 초기화
    dispatch(clearMenuCache());

    console.log("Header toggleLang curLang="+i18nInstance.language+", next="+nextLang);

    localStorage.setItem(LOCALE_KEY, nextLang)  // ✅ APP_LOCALE 저장
    i18nInstance.changeLanguage(nextLang);              // ✅ UI 즉시 반영
    navigate(nextPath);                         // ✅ 경로 이동
  }
  /**************************** 한국어/영어 사이트 변환 설정 종료 *********************/

  const menuItems1 = [
    {
      key: 'main-tasks',
      label: '주요 업무',
      children: [
        {
          key: 'safety-report',
          label: '의약품 이상사례보고',
          children: [
            {
              key: 'safety-report-online1',
              label: '이상사례보고',
              children: [
                { key: 'safety-report-online11', label: <NavLink to={to("/safety/report1")}>이상사례 보고란?</NavLink> },
                { key: 'safety-report-online12', label: <NavLink to={to("/safety/report2")}>KAERS란?</NavLink> },
              ],
            },
            {
              key: 'safety-report-online2', 
              label: '온라인 보고',
              children: [
                { key: 'safety-report-online21', label: <NavLink to='https://nedrug.mfds.go.kr/CCCBA03F010/getReport'>의약품이상사례</NavLink> },
                { key: 'safety-report-online22', label: <NavLink to='https://nedrug.mfds.go.kr/CCCBA03F010/getReportQuasiDrug'>의약외품(생리대 등)</NavLink> },
              ],
            },
            { key: 'safety-report-offline', label: <NavLink to={to("/safety/report5")}>오프라인 보고</NavLink> },
            { key: 'safety-report-archive', label: <NavLink to={to("/safety/report6")}>이상사례보고자료실</NavLink> },
            { key: 'safety-report-guide', label: <NavLink to={to("/safety/report7")}>온라인보고방법 안내</NavLink> },
          ],
        },
        {
          key: 'side-effects-report',
          label: '의약품 부작용 보고 자료',
          children: [
            { key: 'side-effects-report1', label: '의약품 부작용 보고1' },
            { key: 'side-effects-report2', label: '의약품 부작용 보고2' },
            { key: 'side-effects-report3', label: '의약품 부작용 보고3' }
          ]
        },
        {
          key: 'safety-mgmt',
          label: '의약품 안전관리',
          children: [
            { key: 'safety-terms', label: '약물감시용어' },
            { key: 'safety-causality', label: '부작용 인과관계규명' },
            { key: 'safety-related', label: '유관기관' }
          ]
        },
        {
          key: 'pharma-linkage-analysis',
          label: '의약품.의료정보.연계분석',
          children: [
            { key: 'pharma-linkage-analysis1', label: '의약품.의료정보.연계분석1' },
            { key: 'pharma-linkage-analysis2', label: '의약품.의료정보.연계분석2' },
            { key: 'pharma-linkage-analysis3', label: '의약품.의료정보.연계분석3' }
          ]
        },
        {
          key: 'dur',
          label: 'DUR 정보',
          children: [
            { key: 'dur-understand', label: 'DUR 이해' },
            {
              key: 'dur-search-room', label: 'DUR 정보검색방',
              children: [
                { key: 'dur-search-room1', label: 'DUR 통합검색' },
                { key: 'dur-search-room2', label: '병용금기' },
                { key: 'dur-search-room3', label: '특정연령대금기' },
                { key: 'dur-search-room4', label: '임부금기' },
                { key: 'dur-search-room5', label: '효능군중복주의' },
                { key: 'dur-search-room6', label: '용량주의' },
                { key: 'dur-search-room7', label: '투여기간주의' },
                { key: 'dur-search-room8', label: '노인주의' },
                { key: 'dur-search-room9', label: '수유부주의' },
              ],
            },
            {
              key: 'dur-appropriate-use', label: '의약품 적정사용 정보방',
              children: [
                { key: 'dur-appropriate-use1', label: '노인 적정사용정보집' },
                { key: 'dur-appropriate-use2', label: '소아 적정사용정보집' },
                { key: 'dur-appropriate-use3', label: '임부 적정사용정보집' },
                { key: 'dur-appropriate-use4', label: '간질환 적정사용정보집' },
                { key: 'dur-appropriate-use5', label: '신질환 적정사용정보집' },
              ],
            },
            { key: 'dur-notice', label: <NavLink to={to("/dur/notice")}>DUR 게시판</NavLink> },
            { key: 'dur-proposal', label: <NavLink to={to("/dur/proposal")}>DUR 제안</NavLink> },
          ],
        },
        {
          key: 'relief',
          label: '부작용 피해구제',
          children: [
            { key: 'relief-system', label: '제도소개' },
            { key: 'relief-apply', label: '피해구제 신청' },
            { key: 'relief-news', label: '뉴스/소식' },
            { key: 'relief-faq', label: <NavLink to='https://nedrug.mfds.go.kr'>자주하는 질문</NavLink> },
          ],
        },
        {
          key: 'clinical-trial',
          label: '임상시험안전지원',
          children: [
            { key: 'clinical-trial1', label: '임상시험안전지원기관' },
            { key: 'clinical-trial2', label: '협약 안내' },
            { key: 'clinical-trial3', label: '중앙IRB신청' },
            { key: 'clinical-trial4', label: '임상시험헬프데스크' },
            { key: 'clinical-trial5', label: '공지사항' },
            { key: 'clinical-trial6', label: '자료실' },
          ],
        },
      ]
    },
    {
      key: 'open',
      label: '정보공개',
      children: [
        {
          key: 'open-info', 
          label: '정보공개',
          children: [
            { key: 'open-info1', label: '업무처리절차' },
            { key: 'open-info2', label: <NavLink to='https://open.go.kr'>정보공개 청구</NavLink> },
            { key: 'open-info3', label: '임직원국외출장' },
            { key: 'open-info4', label: '원장 업무추진비 집행내역' },
          ],
        },
        { key: 'open-data', label: '공공데이터 개방' },
        {
          key: 'open-mgmt',  
          label: '경영공시',
          children: [
            { key: 'open-mgmt1', label: '부패행위 징계현황' },
            { key: 'open-mgmt2', label: '징계기준' },
            { key: 'open-mgmt3', label: '징계현황' },
          ],
        },
        { key: 'open-bizname', label: '사업실명제' },
      ],
    },
    {
      key: 'notice',
      label: '기관소식',
      children: [
        { key: 'notice-list', label: <NavLink to={to("/notice")}>공지사항</NavLink> },
        { key: 'notice-jobs', label: '채용게시판' },
        { key: 'notice-faq', label: 'FAQ' },
        { key: 'notice-petition', label: '국민신문고' },
        { key: 'notice-press',label: '보도자료' },
        {
          key: 'notice-newsletter', 
          label: '뉴스레터',
          children: [
            { key: 'notice-bio-focus', label: <NavLink to='https://ltfu.mfds.go.kr'>첨단바이오 포커스</NavLink> },
            { key: 'notice-safe-info', label: '마약류 안전정보지' },
            { key: 'notice-leaflet', label: '리플릿' }
          ],
        },
        { key: 'notice-card', label: '카드뉴스' },
        { key: 'notice-video', label: '동영상' },
        { key: 'notice-archive', label: '자료실' },
      ],
    },
    {
      key: 'about',
      label: '기관소개',
      children: [
        { key: 'about-greeting', label: '기관장 인사말' },
        { key: 'about-former', label: '역대 기관장' },
        { key: 'about-history', label: '연혁' },
        { key: 'about-vision', label: '비전 및 목표' },
        { key: 'about-org', label: '조직도' },
        { key: 'about-law', label: '설립근거 및 관련법령' },
        { key: 'about-charter', label: '고객헌장' },
        { key: 'about-news', label: '우리원동정' },
        { key: 'about-ci', label: 'CI소개' },
        {
          key: 'about-ethics', 
          label: '윤리경영',
          children: [
            { key: 'about-ethics-clean', label: '클린신고센터' }
          ],
        },
        { key: 'about-character', label: '캐릭터소개' },
        { key: 'about-map', label: <NavLink to='https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do'>오시는 길</NavLink> },
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
  // const menuItems2 = [
  //   // 필요하면 “전문가” 상위 그룹을 따로 두고 그 안에 넣어도 되고,
  //   // 지금은 최상위에 단일 메뉴로 추가하는 예시
  //   ...(isExpert ? [expertMyWorkMenuItem] : []),

  //   ...menuItems1
  // ];

  
  const menuItems2 = useMemo(() => buildAntdMenuItems(list, to), [list, to]);

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
                {i18nInstance.language === 'ko' ? 'English' : '한국어'}
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
                <img src={i18nInstance.language === 'ko' ? '/img/logo.png' : '/img/logo_eng02.png'} alt={`KIDS ${t("kidsName")}`} />
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
