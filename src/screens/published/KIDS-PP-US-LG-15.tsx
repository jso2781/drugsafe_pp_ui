import React, { useMemo, useState } from 'react'
import { Card, Form, Input, Checkbox, Button, Typography, Space, Alert } from 'antd'
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
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <Card>
          <Title level={4} style={{ marginTop: 0 }}>
            아이디 로그인
          </Title>

          <Form<LoginValues>
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="loginId"
              label="아이디"
              rules={[
                { required: true, message: '아이디 혹은 이메일을 입력하세요.' }, // 문구 :contentReference[oaicite:10]{index=10}
                {
                  validator: async (_, value) => {
                    const v = String(value ?? '')
                    if (v.length > 20) throw new Error('아이디는 최대 20자까지 입력 가능합니다.')
                    if (KOREAN_REGEX.test(v)) throw new Error('아이디에는 한글을 입력할 수 없습니다.')
                  },
                },
              ]}
            >
              <Input
                placeholder="아이디 혹은 이메일을 입력하세요."
                maxLength={20} // 최대 20자 :contentReference[oaicite:11]{index=11}
                autoComplete="username"
                onChange={(e) => {
                  // 한글은 입력 불가: 입력 즉시 제거(UX용)
                  const cleaned = e.target.value.replace(KOREAN_REGEX, '')
                  if (cleaned !== e.target.value) form.setFieldValue('loginId', cleaned)
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="비밀번호"
              rules={[
                { required: true, message: '비밀번호를 입력하세요' }, // 문구 :contentReference[oaicite:12]{index=12}
                {
                  validator: async (_, value) => {
                    const v = String(value ?? '')
                    if (v.length > 20) throw new Error('비밀번호는 최대 20자까지 입력 가능합니다.')
                  },
                },
              ]}
            >
              <Input.Password
                placeholder="비밀번호를 입력하세요"
                maxLength={20} // 최대 20자 :contentReference[oaicite:13]{index=13}
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item name="rememberId" valuePropName="checked" style={{ marginBottom: 12 }}>
              <Checkbox>아이디 저장</Checkbox>
            </Form.Item>

            {/* (선택) 실패상태를 상단에서도 한 번 더 보여주고 싶으면 유지 */}
            {loginFail ? (
              <Alert
                style={{ marginBottom: 12 }}
                type="error"
                showIcon
                message={`${loginFail.reason} (오류 ${loginFail.failedCount}회)`}
              />
            ) : null}

            <Button type="primary" htmlType="submit" block>
              로그인
            </Button>

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <Space size={12}>
                {/* 링크 이동 요구사항 :contentReference[oaicite:14]{index=14} */}
                <Link href="/join/step1">회원가입</Link>
                <Link href="/login/find-id">아이디 찾기</Link>
                <Link href="/login/find-password">비밀번호 찾기</Link>
              </Space>
            </div>

            {/* 안내 문구 영역 :contentReference[oaicite:15]{index=15} */}
            <div style={{ marginTop: 16 }}>
              <Text type="secondary" style={{ display: 'block' }}>
                개인정보 보호를 위해 비밀번호 5회 이상 오류 시, 비밀번호 재설정이 필요합니다.
              </Text>
              <Text type="secondary" style={{ display: 'block' }}>
                비밀번호는 주기적(3개월)으로 변경하시고, 서비스 이용 후 반드시 로그아웃 하시기 바랍니다.
              </Text>
              <Text type="secondary" style={{ display: 'block' }}>
                로그인 후 60분 동안 미동작 시 자동으로 로그아웃 됩니다.
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </ScreenShell>
  )
}