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
      { key: '/dur/understand', label: 'Understanding DUR' },
      { key: '/dur/search', label: 'DUR Information Search'},
      { key: '/dur/use', label: 'Information on appropriate use of medicines'},
      { key: '/dur/notice', label: 'Notification Board' },
      { key: '/dur/proposal', label: 'Suggestions' },
    ],
    [],
  )

  const procedureItems = useMemo(
    () => [
      { title: 'Homepage', description: 'Opinion Suggestions Accepted' },
      { title: 'Organize And Review Opinions' },
      { title: 'Expert Advisory Meeting' },
      { title: 'Reply With Review Results' },
    ],
    [],
  )

  const onFinish = async (values: DurProposalFormValues) => {
    // NOTE: 실제 API 연동 전까지는 프론트에서만 확인
    console.log('DUR Proposal Submit:', values);
    message.success('Your suggestion has been submitted. A representative will review it and contact you.');
    form.resetFields();
  }

  return (
    <div className="ds-page ds-dur-proposal">
      <div className="ds-container">
        <Breadcrumb
          className="ds-breadcrumb"
          items={[
            { title: 'Home' },
            { title: 'DUR Information' },
            { title: 'Suggestions' },
          ]}
        />

        <PageTitle title="Suggestions" subtitle="DUR Information" />

        <div className="ds-page-grid">
          <aside className="ds-side">
            <Card className="ds-card" bordered={false}>
              <Title level={4} style={{ margin: 0 }}>DUR Information</Title>
              <div style={{ height: 10 }} />
              <Menu mode="inline" selectedKeys={['/dur/proposal']} items={sideItems} />
            </Card>
          </aside>

          <main className="ds-content">
            <Card className="ds-card" bordered={false}>
              <Paragraph>
                The Korea Institute of Drug Safety and Risk Management conducts periodic evaluations of DUR information to determine whether additional or updated information is needed.
                <br />
                We aim to reflect the opinions of those in the field by reviewing the suggestions from healthcare professionals.
              </Paragraph>
              <Paragraph>
                If you have any questions regarding the suggestion, <Text strong>DUR Information Team</Text>
                Please contact us at (T. 02-2172-6824, kids_dur@drugsafe.or.kr).
              </Paragraph>
              <Alert
                type="info"
                showIcon
                message="After receiving your comments, we will contact you using the contact information you provided."
              />
            </Card>

            <Card className="ds-card" bordered={false}>
              <Title level={4} className="ds-section-title">
                Consent to collection and use of personal information
              </Title>
              <Paragraph className="ds-muted">
                The Korea Institute of Drug Safety and Risk Management (KISTR) intends to collect and use personal information as follows in connection with the DUR opinion proposal. Please read the details carefully and decide whether to consent.
              </Paragraph>

              <div className="ds-consent-box">
                <ol>
                  <li>Collected information: name, occupation, phone number or email address</li>
                  <li>Purpose of collection and use: Collecting opinions on additions or changes to DUR information.</li>
                  <li>Retention period: 10 years</li>
                  <li>
                    Right to Withdraw Consent: You have the right to withhold consent to the collection and use of your personal information. However, if you do so, your use of the DUR suggestion service will be restricted.
                  </li>
                </ol>
              </div>

              <Divider />

              <Title level={4} className="ds-section-title">
                Comment Processing Process
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
                      <Text strong>*</Text> indicates required fields.
                    </span>
                  }
                  className="ds-form-alert"
                />

                <Form.Item
                  label="Consent to collection and use of personal information"
                  name="agree"
                  rules={[{ required: true, message: 'Please select whether you agree or not.' }]}
                >
                  <Radio.Group>
                    <Radio value="Y">Agree</Radio>
                    <Radio value="N">Disagree</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="age14"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, v) =>
                        v ? Promise.resolve() : Promise.reject(new Error('Please confirm that you are at least 14 years of age.')),
                    },
                  ]}
                >
                  <Checkbox>Must be 14 years of age or older.</Checkbox>
                </Form.Item>

                <Divider />

                <div className="ds-form-grid">
                  <Form.Item
                    label={
                      <span>
                        Opinion Provider <Text strong>*</Text> Name
                      </span>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name.' }]}
                  >
                    <Input placeholder="name" />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span>
                        Division <Text strong>*</Text>
                      </span>
                    }
                    name="role"
                    rules={[{ required: true, message: 'Please select a category (occupation).' }]}
                  >
                    <Radio.Group>
                      <Radio value="doctor">doctor</Radio>
                      <Radio value="chemist">chemist</Radio>
                      <Radio value="nurse">nurse</Radio>
                      <Radio value="consumer">consumer</Radio>
                      <Radio value="etc">etc</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <Form.Item
                  label={
                    <span>
                      Contact(Phone/E-Mail) <Text strong>*</Text>
                    </span>
                  }
                  name="contact"
                  rules={[{ required: true, message: 'Please enter your contact information (phone or email).' }]}
                >
                  <Input placeholder="예) 010-0000-0000 / email@example.com" />
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      Current Status And Problems <Text strong>*</Text>
                    </span>
                  }
                  name="problem"
                  rules={[{ required: true, message: 'Please enter the current status and issues.' }]}
                >
                  <Input.TextArea rows={4} placeholder="Please briefly describe your comments and requests." />
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      Details <Text strong>*</Text>
                    </span>
                  }
                  name="detail"
                  rules={[{ required: true, message: 'Please enter your details.' }]}
                  extra="It is necessary to provide supporting literature such as domestic and international approvals, clinical practice guidelines, and textbooks."
                >
                  <Input.TextArea rows={6} placeholder="Please write detailed content along with supporting references." />
                </Form.Item>

                <Form.Item label="Notes And More" name="etc">
                  <Input.TextArea rows={3} placeholder="If you have any additional information to share, please write it down." />
                </Form.Item>

                <Form.Item label="Attachment" name="files" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                  <Upload multiple beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Form.Item>

                <Divider />

                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit Proposal
                  </Button>
                  <Button onClick={() => form.resetFields()}>Reset</Button>
                </Space>
              </Form>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
