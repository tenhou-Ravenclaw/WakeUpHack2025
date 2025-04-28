import React                                      from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login                                      from './pages/Login';  // ログインページ
import MyPage                                     from './pages/MyPage';  // マイページ
import BuildManagePage                            from "./pages/buildmanage/BuildManagePage";
import JobSearchersPage                           from "./pages/jobsearcher/JobSearchersPage";
import JobSeacherEditPage                         from "./pages/jobsearcher/JobSeacherEditPage";  // 編集ページ
import JobSearcherDetailPage                      from "./pages/jobsearcher/JobSearcherDetailPage";  // 詳細ページ
import JobSearcherRegisterPage                    from "./pages/jobsearcher/JobSearcherRegisterPage";  // 登録ページ
import ReportRegistrationConfirmationPage         from "./pages/report/ReportRegistrationConfirmationPage";  // 報告書確認ページ
import ReportRegistrationDetailPage               from "./pages/report/ReportRegistrationDetailPage";  // 報告書詳細ページ
import ReportRegistrationPage                     from "./pages/report/ReportRegistrationPage";  // 報告書登録ページ
import BuildSaleDetailPage                        from "./pages/sale/BuildSaleDetailPage";  // 物件売買詳細ページ
import BuildSalePage                              from "./pages/sale/BuildSalePage";  // 物件売買ページ

function App() {
  return (
    <>
    <Router> {/* アプリケーション全体で1回だけ使用 */}
      <Routes>
        <Route path="/login"                             element={<Login />} />
        <Route path="/mypage"                            element={<MyPage />} />
        <Route path="/mypage/buildmanage"                element={<BuildManagePage />} />
        <Route path="/mypage/jobsearcher"                element={<JobSearchersPage />} />
        <Route path="/mypage/jobsearcher/edit"           element={<JobSeacherEditPage />} />
        <Route path="/mypage/jobsearcher/detail"         element={<JobSearcherDetailPage />} />
        <Route path="/mypage/jobsearcher/register"       element={<JobSearcherRegisterPage />} />
        <Route path="/mypage/report/confirmation"        element={<ReportRegistrationConfirmationPage />} />
        <Route path="/mypage/report/detail"              element={<ReportRegistrationDetailPage />} />
        <Route path="/mypage/report/register"            element={<ReportRegistrationPage />} />
        <Route path="/mypage/sale/detail"                element={<BuildSaleDetailPage />} />
        <Route path="/mypage/sale/"                       element={<BuildSalePage />} />
      </Routes>
    </Router>
    {/*<h1>Hello World</h1>
    <a href="/login">Go to Login</a>*/}
    </>
  );
}

export default App;
