import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyPage from "./pages/mypage/MyPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import SetCredit from "./pages/setcredit/SetCredit";
import SetBuild from "./pages/mypage/setbuild/SetBuild";
import ReportList from "./pages/mypage/reportList/ReportList";
import CheckSell from "./pages/checksell/CheckSell";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setcredit" element={<SetCredit />} />
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path="/mypage/setbuild" element={<SetBuild />} />
        <Route path="/mypage/reportList" element={<ReportList />} />
        <Route path="/checkSell" element={<CheckSell />} />
      </Routes>
    </Router>
  );
}

export default App;