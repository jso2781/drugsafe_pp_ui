import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    fontFamily: "'Pretendard', sans-serif",
    colorPrimary: '#087C80',
    colorPrimaryHover: '#0A6C70',
    colorError: '#BD2C0F',
    colorText: '#1E2124',
    colorTextDescription: '#464C53',
    colorTextPlaceholder: '#8A949E',
    colorBorder: '#D8D8D8',
    colorBgContainer: '#ffffff',
    borderRadius: 4,

    // 모달 헤더 하단 선 및 공통 구분선
    colorSplit: '#303336',
  },
  components: {
    Modal: {
      titleFontSize: 24,
      titleColor: '#1E2124',
      fontWeightStrong: 700,
      headerBg: '#ffffff',
      titleLineHeight: 1.5,
      borderRadiusLG: 8,
    },
    Checkbox: {
      colorPrimary: '#087C80',
      colorBgContainer: '#ffffff',
      colorPrimaryHover: '#0A6C70',
    },
    Radio: {
      colorPrimary: '#087C80',
      colorBgContainer: '#ffffff',
    },
    Switch: {
      colorPrimary: '#087C80',
      colorTextQuaternary: '#087C80',
      handleBg: '#ffffff',
    },
    Input: {
      colorBorder: '#D8D8D8',
      colorPrimaryHover: '#087C80',
      borderRadius: 8,

      /* [size="large"] */
      controlHeightLG: 64,
      fontSizeLG: 18,
      paddingInlineLG: 16,

      /* [기본(default)] */
      controlHeight: 56,
      fontSize: 17,
      paddingInline: 15,

      /* [size="small"] */
      controlHeightSM: 32,
      fontSizeSM: 14,
      paddingInlineSM: 8,
      borderRadiusSM: 4,
    },
    Select: {
      colorBorder: '#D8D8D8',
      optionSelectedBg: '#EDF8F8',
      optionActiveBg: '#f5f5f5',
      borderRadius: 8,
      
      /* Input 높이와 일치화 */
      controlHeightLG: 64,
      controlHeight: 56,
      controlHeightSM: 32,
      fontSizeLG: 18,
      fontSize: 17,
    },
    DatePicker: {
      controlHeight: 56,
    },
    Button: {
      colorBorder: '#1E2124',
      colorText: '#1E2124',
      defaultHoverBg: '#CDD1D5',
      defaultHoverColor: '#1E2124',
      colorPrimary: '#087C80',
      colorPrimaryHover: '#0A6C70',
      borderRadius: 8,

      // type="link" 스타일
      colorLink: '#000000',
      colorLinkHover: '#066266',
      colorLinkActive: '#044a4d',

      // 그림자 제거
      controlOutline: 'none',
      boxShadow: 'none',
      boxShadowTertiary: 'none',

      /* [size="large"] */
      controlHeightLG: 64,
      contentFontSizeLG: 18,
      paddingInlineLG: 20,

      /* [기본(default)] */
      controlHeight: 56,
      contentFontSize: 17,
      paddingInline: 18,

      /* [size="small"]  */
      controlHeightSM: 32,
      contentFontSizeSM: 14,
      borderRadiusSM: 4,
      paddingInlineSM: 12,
    },
    Form: {
      /* 라벨과 입력창 사이의 간격 미세 조정 */
      verticalLabelPadding: '0 0 8px',
      itemMarginBottom: 24,
    },
  },
};