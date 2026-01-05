import { useMemo } from 'react'
import {
  Breadcrumb,
  Card,
  Typography,
  Divider,
  Alert,
  Form,
  Input,
  Radio,
  Checkbox,
  Upload,
  Button,
  Steps,
  Space,
  message,
  Menu,
} from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'
import PageTitle from '@/components/common/PageTitle'

const { Title, Paragraph, Text } = Typography

type DurProposalFormValues = {
  age14?: boolean
  agree?: boolean
  name?: string
  role?: string
  problem?: string
  detail?: string
  etc?: string
  contact?: string
  files?: UploadFile[]
}


export default function DurProposal() {
  const [form] = Form.useForm()

  const sideItems = useMemo(
    () => [
      { key: 'dur-understand', label: 'DUR 이해' },
      { key: 'dur-search', label: 'DUR 정보검색' },
      { key: 'dur-use', label: '의약품 적정사용정보' },
      { key: 'dur-board', label: '알림 게시판' },
      { key: 'dur-proposal', label: '의견 제안' },
    ],
    [],
  )

  const procedureItems = useMemo(
    () => [
      { title: '홈페이지', description: '의견제안 접수' },
      { title: '의견정리 및 검토' },
      { title: '전문가 자문회의' },
      { title: '검토결과 회신' },
    ],
    [],
  )

  const onFinish = async (values: DurProposalFormValues) => {
    // NOTE: 실제 API 연동 전까지는 프론트에서만 확인
    console.log('DUR proposal submit:', values)
    message.success('의견 제안이 등록되었습니다. 담당자가 확인 후 연락드리겠습니다.')
    form.resetFields()
  }

  return (
    <div className="ds-page ds-dur-proposal">
      <div className="ds-container">
        <Breadcrumb
          className="ds-breadcrumb"
          items={[
            { title: '홈' },
            { title: 'DUR 정보' },
            { title: '의견 제안' },
          ]}
        />

        <PageTitle title="의견 제안" subtitle="DUR 정보" />

        <div className="ds-page-grid">
          <aside className="ds-side">
            <Card className="ds-card" bordered={false}>
              <Title level={4} style={{ margin: 0 }}>DUR정보</Title>
              <div style={{ height: 10 }} />
              <Menu mode="inline" selectedKeys={['dur-proposal']} items={sideItems} />
            </Card>
          </aside>

          <main className="ds-content">
            <Card className="ds-card" bordered={false}>
              <Paragraph>
                한국의약품안전관리원에서는 DUR정보의 추가 또는 변경이 필요한 부분에 대해서
                수시평가를 실시하고 있습니다.
                <br />
                보건의료 전문가들로부터 제안된 의견들을 검토함으로써 현장의 의견을 반영하고자
                합니다.
              </Paragraph>
              <Paragraph>
                의견제안과 관련하여 궁금한 점이 있으시면 <Text strong>DUR정보팀</Text>
                (T. 02-2172-6824, kids_dur@drugsafe.or.kr)으로 연락주시기 바랍니다.
              </Paragraph>
              <Alert
                type="info"
                showIcon
                message="의견 접수 후 남겨주신 연락처로 연락 드리겠습니다."
              />
            </Card>

            <Card className="ds-card" bordered={false}>
              <Title level={4} className="ds-section-title">
                개인정보 수집·이용 동의
              </Title>
              <Paragraph className="ds-muted">
                한국의약품안전관리원은 DUR 의견 제안과 관련하여 아래와 같이 개인정보를
                수집·이용하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오.
              </Paragraph>

              <div className="ds-consent-box">
                <ol>
                  <li>수집항목: 성명, 구분(직업), 전화번호 또는 이메일</li>
                  <li>수집·이용 목적: DUR정보의 추가 또는 변경 의견 수집</li>
                  <li>보유기간: 10년</li>
                  <li>
                    동의 거부권리 안내: 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
                    그러나 동의를 거부할 경우 DUR 의견 제안 이용이 제한됩니다.
                  </li>
                </ol>
              </div>

              <Divider />

              <Title level={4} className="ds-section-title">
                의견 제안 처리 절차
              </Title>
              <Steps className="ds-procedure" items={procedureItems} />
            </Card>

            <Card className="ds-card" variant="borderless">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ agree: undefined, age14: false }}
              >
                <Alert
                  type="warning"
                  showIcon
                  message={
                    <span>
                      <Text strong>*</Text> 표시는 필수 입력 사항입니다.
                    </span>
                  }
                  className="ds-form-alert"
                />

                <Form.Item
                  label="개인정보 수집·이용 동의"
                  name="agree"
                  rules={[{ required: true, message: '동의 여부를 선택해 주세요.' }]}
                >
                  <Radio.Group>
                    <Radio value="Y">동의함</Radio>
                    <Radio value="N">동의하지 않음</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="age14"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, v) =>
                        v ? Promise.resolve() : Promise.reject(new Error('만 14세 이상 여부를 확인해 주세요.')),
                    },
                  ]}
                >
                  <Checkbox>만 14세 이상입니다.</Checkbox>
                </Form.Item>

                <Divider />

                <div className="ds-form-grid">
                  <Form.Item
                    label={
                      <span>
                        의견제공자 <Text strong>*</Text> 성명
                      </span>
                    }
                    name="name"
                    rules={[{ required: true, message: '성명을 입력해 주세요.' }]}
                  >
                    <Input placeholder="성명" />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span>
                        구분 <Text strong>*</Text>
                      </span>
                    }
                    name="role"
                    rules={[{ required: true, message: '구분(직업)을 선택해 주세요.' }]}
                  >
                    <Radio.Group>
                      <Radio value="의사">의사</Radio>
                      <Radio value="약사">약사</Radio>
                      <Radio value="간호사">간호사</Radio>
                      <Radio value="소비자">소비자</Radio>
                      <Radio value="기타">기타</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <Form.Item
                  label={
                    <span>
                      연락처(Phone/e-mail) <Text strong>*</Text>
                    </span>
                  }
                  name="contact"
                  rules={[{ required: true, message: '연락처(전화 또는 이메일)를 입력해 주세요.' }]}
                >
                  <Input placeholder="예) 010-0000-0000 / email@example.com" />
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      현황 및 문제점 <Text strong>*</Text>
                    </span>
                  }
                  name="problem"
                  rules={[{ required: true, message: '현황 및 문제점을 입력해 주세요.' }]}
                >
                  <Input.TextArea rows={4} placeholder="의견 및 요청사항을 간략히 기재해 주세요." />
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      상세기재 <Text strong>*</Text>
                    </span>
                  }
                  name="detail"
                  rules={[{ required: true, message: '상세 내용을 입력해 주세요.' }]}
                  extra="국내외 허가사항, 임상진료지침, 교과서 등 근거 문헌 제시가 필요합니다."
                >
                  <Input.TextArea rows={6} placeholder="근거 문헌과 함께 상세 내용을 작성해 주세요." />
                </Form.Item>

                <Form.Item label="참고사항 및 기타" name="etc">
                  <Input.TextArea rows={3} placeholder="추가로 전달하실 내용이 있다면 작성해 주세요." />
                </Form.Item>

                <Form.Item label="첨부파일" name="files" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                  <Upload multiple beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>파일 선택</Button>
                  </Upload>
                </Form.Item>

                <Divider />

                <Space>
                  <Button type="primary" htmlType="submit">
                    제안등록
                  </Button>
                  <Button onClick={() => form.resetFields()}>초기화</Button>
                </Space>
              </Form>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
