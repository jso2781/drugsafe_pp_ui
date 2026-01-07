import React, { useState, useMemo } from 'react'
import { Form, Input, Radio, Checkbox, Select, Switch, DatePicker, Button, Row, Col, Space, Menu } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function KIDS_PP_US_EC_01() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const config = {
    submitLabel: '저장'
  }

  const [form] = Form.useForm();

  function onFinish(values : any) {
    console.log('검색 조건:', values);
  }

  const onReset = () => {
    form.resetFields();
  };

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

                <div className="filter_finder">
                  <div className="search_wrap">
                      <Form
                        form={form}
                        layout="horizontal"
                        className="tbl_filter"
                        labelCol={{ style: { width: '120px', textAlign: 'left', paddingLeft: '15px', fontWeight: 'bold' } }}
                      >
                      <Row>
                        <Col span={12}>
                          <Form.Item label="라디오 선택" name="radio">
                            <Radio.Group>
                              <Radio value="Y">선택1</Radio>
                              <Radio value="N">선택2</Radio>
                              <Radio value="S">선택3</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="체크박스" name="checkbox">
                            <Checkbox.Group>
                              <Checkbox value="1">Checkbox 1</Checkbox>
                              <Checkbox value="2">Checkbox 2</Checkbox>
                            </Checkbox.Group>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <Form.Item label="토글스위치">
                            <Space size={12} align="center">
                              <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                              <span>스위치 1</span>
                              <Switch />
                              <span>스위치 2</span>
                            </Space>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <Form.Item label="검색유형">
                            <Space.Compact style={{ width: '100%' }}>
                              <Select defaultValue="all" style={{ width: '120px' }}>
                                <Select.Option value="all">전체</Select.Option>
                                <Select.Option value="title">제목</Select.Option>
                              </Select>
                              <Input placeholder="검색어를 입력하세요" />
                              <Button type="primary">조회</Button>
                            </Space.Compact>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <Form.Item label="검색 조회">
                            <Space size={5}>
                              <Input placeholder="입력하세요" />
                              <Button type="primary">조회</Button>
                            </Space>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row className="form_row">
                        <Col span={24}>
                          <Form.Item label="날짜" name="registerDate">
                            <DatePicker style={{ width: '100%' }} placeholder="날짜를 선택하세요" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <Form.Item label="기간">
                            <RangePicker />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  <div className="search_btn_group">
                    <Button>
                      <ReloadOutlined className="ico_reset" /> 초기화
                    </Button>
                    <Button type="primary" >
                      <SearchOutlined className="ico_search" /> 검색
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