import React from 'react'
import { Link } from 'react-router-dom'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

import { ArrowForward } from '@mui/icons-material';

export default function KIDS_PP_US_JM_01() {
  const current = 0;

  const stepItems = [
    { title: '1단계', description: '회원 유형 선택' },
    { title: '2단계', description: '약관 동의' },
    { title: '3단계', description: '본인 인증' },
    { title: '4단계', description: '회원 정보 입력' },
    { title: '5단계', description: '가입 신청 완료' },
  ];

  // return <FormTemplate screenId="KIDS-PP-US-JM-01" title="회원가입 회원 유형 선택" config={config} />
  return (
    <ScreenShell screenId="KIDS_PP_US_JM_01" title="회원가입 회원 유형 선택" uiType="page">
    <div className="page_layout">
      <div className="sub_container">
        <div className="content_wrap">

          {/* sub content :: s */}
          <div className="sub_content">
            <DepsLocation></DepsLocation>
            <div className="content_view" id="content">

              <div className="pageCont_joinType member_page">
                <div className="joinType_step">
                  <Steps
                    current={current}
                    items={stepItems}
                    labelPlacement="vertical"
                  />
                </div>
                <div className="step_content">
                  <h3 className="step_title">
                    <p className="step_count"><span>1단계</span> / 5단계 </p>
                    <p className="step_desc">{stepItems[current].description}</p>
                  </h3>
                  <ul className="joinType_list">
                    <li className="item item_general">
                      <Link to="#" className="joinType_link">
                        <strong className="joinType_name">일반 회원(만 14세 이상 회원)</strong>
                        <p className="joinType_info">만14세 이상의 회원을 가입합니다.</p>
                        <span className="joinType_btn">
                          가입하기 <ArrowChevronRight className="ico_arrow_right" />
                        </span>
                      </Link>    
                    </li>
                    <li className="item item_junior">
                      <Link to="#" className="joinType_link">
                        <strong className="joinType_name">일반 회원(만 14세 미만 회원)</strong>
                        <p className="joinType_info">만 14세 미만 가입 시 법정대리인의 동의가 필요합니다.</p>
                        <span className="joinType_btn">
                          가입하기 <ArrowChevronRight className="ico_arrow_right" />
                        </span>
                      </Link>    
                    </li>
                  </ul>
                </div>
              </div>    
              
            </div>
            {/* content_view :: e */}
          </div>
          {/* sub content :: e */}
        </div>
      </div>
    </div>
    </ScreenShell>
  )
}
