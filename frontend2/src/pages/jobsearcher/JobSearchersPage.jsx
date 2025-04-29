import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import UpperBar from "../../components/upperBar/UpperBar";
import JobSearcherCard from "../../components/bodyContents/parts/JobSearcherCard";
import "./JobSearchersPage.css";

/**
 * 被就職支援者を管理するページ(被就職支援者一覧)
 * @returns
 */
const JobSearchersPage = () => {
  const navigate = useNavigate(); // navigateフックを使用

  // サンプルデータ
  const jobSearchers = [
    {
      name: "山田 太郎",
      dob: "1990/01/01",
      gender: "男性",
    },
    {
      name: "鈴木 花子",
      dob: "1988/03/05",
      gender: "女性",
    },
    {
      name: "田中 一郎",
      dob: "1992/07/12",
      gender: "男性",
    },
    {
      name: "佐藤 美咲",
      dob: "1995/05/20",
      gender: "女性",
    },
  ];

  const handleNewCreate = () => {
    navigate("/mypage/jobsearcher/register"); // 新規作成ボタンが押されたとき
  };

  const handleDetailClick = () => {
    navigate("/mypage/jobsearcher/detail"); // 詳細ボタンが押されたとき
  };

  return (
    <>
      <UpperBar
        titleName={"【被就職支援者一覧】"}
        subTitleName={"被就職支援者一覧"}
      />
      <div className="new-create-button-container">
        <button className="new-create-button" onClick={handleNewCreate}>
          新規作成
        </button>
      </div>
      <div className="job-searcher-container">
        {jobSearchers.map((jobSearcher, index) => (
          <JobSearcherCard
            key={index}
            jobSearcher={jobSearcher}
            onDetailClick={handleDetailClick} // 詳細ボタンのクリックハンドラー
          />
        ))}
      </div>
    </>
  );
};

export default JobSearchersPage;
