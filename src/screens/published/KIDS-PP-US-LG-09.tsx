import React from 'react'
// import FormTemplate from '../templates/FormTemplate'
import { Form, Input, Button, Row, Col, Flex} from 'antd'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_LG_09() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  // return <FormTemplate screenId="KIDS-PP-US-LG-09" title="비밀번호 변경" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-LG-09" title="비밀번호 변경" uiType="form">
      <div className="page_layout">
        <div className="sub_container">
          <div className="content_wrap">
            {/* sub content :: s */}
            <div className="sub_content">
              <DepsLocation></DepsLocation>
              <div className="content_view" id="content">

                <div className="pageCont_idPwFind member_page">
                  <p className="guide_text">비밀번호 변경을 위해 새로운 비밀번호를 입력해주세요.</p> 
                  <Row className="box_type_01">
                    <Col span={24}>
                      <Form name="pw_reset" layout="vertical">
                        {/* 1. 새 비밀번호 */}
                        <Form.Item
                          name="password"
                          label={
                            <span className="label">
                              새 비밀번호 <span className="necessary">(필수)</span>
                            </span>
                          }
                          rules={[
                            { required: false, message: '비밀번호를 입력하세요.' },
                            { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/, 
                              message: '숫자+영문+특수문자 조합 10자리 이상' }
                          ]}
                        >
                          <Input.Password placeholder="숫자+영문+특수문자 조합 10자리 이상" />
                        </Form.Item>

                        {/* 2. 비밀번호 확인 */}
                        <Form.Item
                          name="confirm"
                          label={
                            <span className="label">
                              비밀번호 확인 <span className="necessary">(필수)</span>
                            </span>
                          }
                          dependencies={['password']}
                          rules={[
                            { required: false, message: '비밀번호 확인을 입력하세요.' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                              },
                            }),
                          ]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input.Password placeholder="비밀번호를 동일하게 입력하세요." />
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                  <div className="btn_group between">
                    <Flex gap={8}>
                      <Button size="large">취소하기</Button>
                      <Button type="primary" size="large">변경하기</Button>
                    </Flex>
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
