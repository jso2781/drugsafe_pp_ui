import { useMemo } from 'react';
import { Row, Col, Select } from 'antd'
import { useTranslation } from 'react-i18next';

// /// 유관기관
// const GOV_SITES = [
//   { label: '식품의약품안전처', value: 'https://www.mfds.go.kr' },
//   { label: '의약품안전나라', value: 'https://nedrug.mfds.go.kr' },
//   { label: '보건복지부', value: 'https://www.mohw.go.kr' },
// ];

// // 관련단체
// const ORG_SITES = [
//   { label: '대한약사회', value: 'https://www.kpanet.or.kr' },
//   { label: '한국제약바이오협회', value: 'http://www.kpbma.or.kr' },
//   { label: '희귀필수의약품센터', value: 'https://www.kodc.or.kr' },
// ];

const RelatedSites = () => {
  const { t, i18n } = useTranslation();

  const langDep = i18n.resolvedLanguage ?? i18n.language;

  // 유관기관
  const GOV_SITES = useMemo(
    () => [
      { label: t("mfdsGoKr"), value: 'https://www.mfds.go.kr' },
      { label: t("nedrugMfdsGoKr"), value: 'https://nedrug.mfds.go.kr' },
      { label: t("mohwGoKr"), value: 'https://www.mohw.go.kr' }
    ],
    [langDep, t]
  );

  // 관련단체
  const ORG_SITES = useMemo(
    () => [
      { label: t("kpanetOrKr"), value: 'https://www.kpanet.or.kr' },
      { label: t("kpbmaOrKr"), value: 'http://www.kpbma.or.kr' },
      { label: t("kodcOrKr"), value: 'https://www.kodc.or.kr' },
    ],
    [langDep, t]
  );

  const handleSelect = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="footer_related">
      <div className="container">
        <Row align="middle" justify="end" gutter={[12, 12]}>
          {/* 첫 번째 셀렉트 */}
          <Col xs={24} sm={12}>
            <div className="select_item">
              <label htmlFor="gov-site-select" className="sr_only">{t("goToRelGov")}</label>
              <Select
                key={`gov-${langDep}`}
                id="gov-site-select"
                placeholder={t("goToRelGov")}
                style={{ width: '100%' }}
                options={GOV_SITES}
                onChange={handleSelect}
                defaultActiveFirstOption={false}
              />
            </div>
          </Col>

          {/* 두 번째 셀렉트 */}
          <Col xs={24} sm={12}>
            <div className="select_item">
              <label htmlFor="org-site-select" className="sr_only">{t("goToRelOrg")}</label>
              <Select
                key={`org-${langDep}`}
                id="org-site-select"
                placeholder={t("goToRelOrg")}
                style={{ width: '100%' }}
                options={ORG_SITES}
                onChange={handleSelect}
                defaultActiveFirstOption={false}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RelatedSites;