import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import { antdTheme } from './themeConfig'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
export default function Layout() {
  return (
    <ConfigProvider theme={antdTheme}>
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  )
}
