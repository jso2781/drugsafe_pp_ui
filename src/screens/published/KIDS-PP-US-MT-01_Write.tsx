import React, { useState, useMemo } from 'react';
import { Form, Input, Select, Checkbox, Radio, Switch, DatePicker ,Upload, Button, Row, Col, Flex, Menu} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined } from '@ant-design/icons';
import DepsLocation from "@/components/common/DepsLocation";
import ScreenShell from '../ScreenShell';


const { TextArea } = Input;

export default function KIDS_PP_US_EC_01() {
  const [form] = Form.useForm();
  
  // 1. 메뉴 접힘 상태 관리
  const [collapsed, setCollapsed] = useState(false);

  // 2. 사이드 메뉴 아이템 정의
  const sideItems = useMemo(() => [
    { key: '/1', label: '내 업무' },
    { key: '/2', label: '업무 신청 관리', disabled: true },
    {
      key: 'centers_group',
      label: '업무 시스템 메뉴 1 ',
      children: [
        { key: '/3', label: '업무 시스템 서브 메뉴 1' },
        { key: '/4', label: '업무 시스템 서브 메뉴 2' },
      ],
    },
    { key: '/6', label: '업무 시스템 메뉴 2', disabled: true },
    { key: '/7', label: '업무 시스템 메뉴 3', disabled: true }
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-MT-01" title="내업무" uiType="page">
      <div className="page_layout">
        <div className="sub_container">
          <div className="content_wrap">
            
           {/* lnb :: s */}
            <div className={`lnb_wrap ${collapsed ? 'is-collapsed' : ''}`}>
              <div className="lnb_menu">
                <h2 className="lnb_tit">
                  {!collapsed && <span>알림마당</span>}
                  <Button 
                    type="text" 
                    onClick={() => setCollapsed(!collapsed)} 
                    className="btn_toggle"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  />
                </h2>
                <div className="lnb_list">
                  <Menu
                    mode="inline"
                    inlineCollapsed={collapsed}
                    selectedKeys={[location.pathname]}
                    items={sideItems}
                    // onClick={(e) => {
                    //   if (e.key.startsWith('http')) {
                    //     window.open(e.key, '_blank');
                    //   } else {
                    //     navigate(e.key);
                    //   }
                    // }}
                  />
                </div>
              </div>
            </div>
            
            {/* sub content :: s */}
            <div className="sub_content">
              <DepsLocation />
              <div className="content_view" id="content">

                <div className="sub_path">
                  <h3 className="tit">회원정보</h3>
                </div>
                <div className="tbl_wrap">
                  <Form
                    form={form}
                    layout="horizontal"
                    className="tbl_view"
                    colon={false}
                    requiredMark={true}
                    labelCol={{ flex: '0 0 200px' }}
                    wrapperCol={{ flex: 1 }}
                  >
                    {/* 1단 구조: 전체 너비 */}
                    <Row className="form_row">
                      <Col span={24}>
                        <Form.Item label="게시판 명" name="boardName" required>
                          <Input readOnly defaultValue="readonly" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={24}>
                        <Form.Item label="제목" name="title" required>
                          <Input placeholder="제목을 입력하세요" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={24}>
                        <Form.Item label="스위치" name="isFixed" valuePropName="checked">
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={24}>
                        <Form.Item label="라디오 선택" name="radio" initialValue="Y">
                          <Radio.Group>
                            <Radio value="Y">선택1</Radio>
                            <Radio value="N">선택2</Radio>
                            <Radio value="S">선택3</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={24}>
                        <Form.Item label="체크박스" name="checkbox">
                          <Checkbox.Group>
                            <Checkbox value="1">Checkbox 1</Checkbox>
                            <Checkbox value="2">Checkbox 2</Checkbox>
                            <Checkbox value="3">Checkbox3</Checkbox>
                          </Checkbox.Group>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={12}>
                        <Form.Item label="선택" name="select" rules={[{ required: true }]}>
                          <Select placeholder="선택">
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="다중선택" name="selectmMltiple" rules={[{ required: true }]}>
                          <Select mode="multiple" placeholder="태그를 선택하세요 (다중선택 가능)">
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={12}>
                        <Form.Item label="게시 시작일" name="startDate" rules={[{ message: '날짜를 선택하세요' }]}>
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="게시 종료일" name="endDate">
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={24}>
                        <Form.Item label="첨부파일" name="attachments" valuePropName="fileList" getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>
                          <Upload action="/upload" listType="picture">
                            <Button icon={<UploadOutlined />}>파일 선택</Button>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form_row">
                      <Col span={24}>
                        <Form.Item label="내용" name="content" required>
                          <Input.TextArea rows={5} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>

                <div className="board_btn_group">
                  <Flex gap={8}>
                    <Button type="primary" size="large">목록</Button>
                    <Button size="large">수정</Button>
                  </Flex>
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