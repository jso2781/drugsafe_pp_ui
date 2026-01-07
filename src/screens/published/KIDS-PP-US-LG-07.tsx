import React from 'react'
import { Form, Button} from 'antd'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'
import { RightOutlined } from '@ant-design/icons';
export default function KIDS_PP_US_LG_07() {
  // TODO: items/onEdit/onBack 등을 채우세요.
  const config = {
  // items: [{ key:'', label:'', children:'' }]
}

  // return <DetailTemplate screenId="KIDS-PP-US-LG-07" title="아이디 찾기 결과" config={config} />
  return (
      <ScreenShell screenId="KIDS-PP-US-LG-07" title="아이디 찾기 결과" uiType="page">
        <div className="page_layout">
          <div className="sub_container">
            <div className="content_wrap">
    
              {/* sub content :: s */}
              <div className="sub_content">
                <DepsLocation></DepsLocation>
                <div className="content_view" id="content">
                  
                  <div className="pageCont_idPwFind member_page">
                    <p className="guide_text">아이디를 찾았어요.</p>  
                    <div className="id_find_result">
                      <p><span>$김철수$</span>님의 아이디는</p>
                      <p><span className="txt_2">$chskim7788</span>$ 입니다.</p>
                    </div>
                    <Form.Item className="login_actions">
                      <Button type="primary" htmlType="submit" block size="large" className="btn_login fw_700">
                        로그인
                      </Button>
                    </Form.Item>
                    <div className="find_recovery">
                      <p className="txt">비밀번호를 잊으셨다면?</p>
                      <Button type="link" className="btn_link">
                        비밀번호 찾기 <RightOutlined className="icon_chevron" />
                      </Button>
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
