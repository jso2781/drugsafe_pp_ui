import React, { useMemo, useState } from 'react'
import { Form, Input, Button, Space, Row, Col, Typography, Checkbox,} from 'antd'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

type LoginValues = {
  loginId: string
  password: string
  rememberId: boolean
}

type LoginFailInfo = {
  reason: string
  failedCount: number
}

const { Title, Text, Link } = Typography

// 한글 포함 여부(아이디 입력란 한글 불가) :contentReference[oaicite:4]{index=4}
const KOREAN_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g

export default function KIDS_PP_US_LG_15() {
  const [form] = Form.useForm<LoginValues>()

  // 실패 사유/횟수 (비밀번호 입력란 하단 노출) :contentReference[oaicite:5]{index=5}
  const [loginFail, setLoginFail] = useState<LoginFailInfo | null>(null)

  // 예시: API 연동 전까지 실패횟수 시뮬레이션
  const [localFailCount, setLocalFailCount] = useState(0)

  const initialValues: LoginValues = useMemo(
    () => ({
      loginId: '',
      password: '',
      rememberId: false, // 디폴트 미체크 :contentReference[oaicite:6]{index=6}
    }),
    []
  )

  const onSubmit = async (values: LoginValues) => {
    setLoginFail(null)

    // TODO: 실제 로그인 API 호출로 교체
    // 여기서는 "test / 1234"만 성공으로 처리
    const ok = values.loginId === 'test' && values.password === '1234'

    if (!ok) {
      const next = localFailCount + 1
      setLocalFailCount(next)

      setLoginFail({
        reason: '아이디 또는 비밀번호가 올바르지 않습니다.',
        failedCount: next,
      })

      // 폼 에러를 "비밀번호 입력란 하단"에 붙이기 :contentReference[oaicite:7]{index=7}
      form.setFields([
        {
          name: 'password',
          errors: [`${'아이디 또는 비밀번호가 올바르지 않습니다.'} (오류 ${next}회)`],
        },
      ])
      return
    }

    // 성공 시: 회원 유형에 따라 라우팅 처리(요구사항) :contentReference[oaicite:8]{index=8}
    // TODO: 응답에서 userType 받아서 분기
    // - 일반 회원: 메인으로
    // - 전문가 회원: KIDS-PP-US-MT-01 내 업무로
    // navigate('/main') 등으로 교체
    console.log('LOGIN SUCCESS:', values)

    // 아이디 저장 처리 :contentReference[oaicite:9]{index=9}
    // TODO: 실제 정책(마스킹/저장소) 반영
    if (values.rememberId) localStorage.setItem('kids_saved_login_id', values.loginId)
    else localStorage.removeItem('kids_saved_login_id')
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-LG-15" title="아이디 로그인" uiType="input">
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
                        <Form name="login_form" layout="vertical">
                          <Form.Item
                              name="username"
                              label="아이디"
                              rules={[{ message: '아이디 혹은 이메일을 입력하세요.' }]}
                            >
                            <Input placeholder="아이디 혹은 이메일을 입력하세요." />
                          </Form.Item>
    
                          <Form.Item
                            name="password"
                            label="비밀번호" 
                            rules={[{ message: '비밀번호를 입력하세요.' }]}
                          >
                            <Input.Password placeholder="비밀번호를 입력하세요." />
                          </Form.Item>
    
                          <Form.Item name="rememberId" valuePropName="checked">
                            <Checkbox>아이디 저장</Checkbox>
                          </Form.Item>
                          <Form.Item className="login_actions">
                            <Button type="primary" htmlType="submit" block size="large" className="btn_login fw_700">
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
                {/* content_view :: e */}
              </div>
              {/* sub content :: e */}
            </div>
          </div>
        </div>
    </ScreenShell>
  )
}