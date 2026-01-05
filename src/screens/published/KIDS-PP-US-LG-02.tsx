import React from 'react'
import { Form, Input, Button, Space, Divider, Row, Col, Typography, Checkbox, Alert} from 'antd'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

const { Link } = Typography

export default function KIDS_PP_US_LG_02() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-LG-02" title="로그인 로그인 방식 선택" uiType="page">
    <div className="page_layout">
      <div className="sub_container">
        <div className="content_wrap">

          {/* sub content :: s */}
          <div className="sub_content">
            <DepsLocation></DepsLocation>
            <div className="content_view" id="content">
              <div className="pageCont_login">
                <Row>
                  <Col span={12} className="login_form_section">
                    <Form
                      name="login_form"
                      layout="vertical"
                    >
                      <Form.Item
                        name="username"
                        label="아이디"
                        rules={[{ message: '아이디 혹은 이메일을 입력하세요.' }]}
                      >
                        <Input placeholder="아이디 혹은 이메일을 입력하세요." />
                      </Form.Item>
                      <Alert
                          type="error"
                          message="최소 두 자리 수 이상 입력해주세요."
                          showIcon
                          style={{ marginBottom: 12 }}
                        />

                      <Form.Item
                        name="password"
                        label="비밀번호" 
                        rules={[{ message: '비밀번호를 입력하세요.' }]}
                      >
                        <Input.Password placeholder="비밀번호를 입력하세요." />
                      </Form.Item>
                      <Alert
                          type="error"
                          message="아이디 / 이메일 또는 비밀번호가 일치하지 않습니다. (1/5)"
                          showIcon
                          style={{ marginBottom: 12 }}
                        />

                      <Form.Item name="rememberId" valuePropName="checked">
                        <Checkbox>아이디 저장</Checkbox>
                      </Form.Item>
                      <Form.Item className="login_actions">
                        <Button htmlType="submit" block className="btn_login">
                          로그인
                        </Button>
                      </Form.Item>
                    </Form>

                    <div className="login_link">
                      <Space>
                        <Link href="/join/step1">회원가입</Link>
                        <Link href="/login/find-id">아이디 찾기</Link>
                        <Link href="/login/find-password">비밀번호 찾기</Link>
                      </Space>
                    </div>
                  </Col>
                  <Col span={12} className="login_info_section">
                    <ul className="login_guide">
                      <li>개인정보 보호를 위해 비밀번호 5회 이상 오류 시, 비밀번호 재설정이 필요합니다.</li>
                      <li>비밀번호는 주기적(3개월)으로 변경하시고, 서비스 이용 후 반드시 로그아웃 하시기 바랍니다.</li>
                      <li>로그인 후 60분 동안 미동작 시 자동으로 로그아웃 됩니다.</li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {/* sub content :: e */}
        </div>
      </div>
    </div>
    </ScreenShell>
  )
}
