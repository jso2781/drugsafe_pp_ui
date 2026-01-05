import React from 'react'
import { Form, Input, Button, Space, Divider, Row, Col, Typography, Checkbox, Alert} from 'antd'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_EC_01() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-EC-01" title="전문가 회원 전환 신청 소속선택 로그인 방식 선택" uiType="form">
      <div className="page_layout">
        <div className="sub_container">
          <div className="content_wrap">
  
            {/* sub content :: s */}
            <div className="sub_content">
              <DepsLocation></DepsLocation>
              <div className="content_view" id="content">
                
              </div>
            </div>
            {/* sub content :: e */}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
