import React from 'react'
import UpperBar from '../../components/upperBar/UpperBar'
import JobSearcherDetailCard from '../../components/bodyContents/parts/JobSearcherDetailCard';
import { useNavigate } from 'react-router-dom';
import "./jobSearcherDetailPage.css";

/**
 * 被就職支援者詳細ページ
 * @returns 
 */
const JobSearcherDetailPage = () => {
  // ダミーデータ (実際はAPIから取得)
  const jobSearcherData = {
    name: "田中 太郎",
    dob: "1990/01/01",
    gender: "男性",
    career: "IT業界で5年の経験を持ち、ソフトウェア開発に従事。",
    activityRange: "東京都",
    transport: ["徒歩", "自転車"],
  };

  const navigate = useNavigate();

  // 編集ボタンがクリックされたときに /mypage/jobsearcher/edit へ遷移
  const handleEditClick = () => {
    navigate('/mypage/jobsearcher/edit', { state: jobSearcherData });
  };

  // 削除ボタンがクリックされたときにコンソールに削除メッセージ
  const handleDeleteClick = () => {
    console.log("削除ボタンがクリックされました");
    // ここで削除処理を実装することも可能
  };


  return (
    <>
      <UpperBar 
        titleName={"【詳細ページ】"} 
        subTitleName={"被就職支援者詳細"} 
        buttonLabel={"一覧へ戻る"} 
        listPath={"/mypage/jobsearcher"}
      />

      <div className='job-searcher-detail-buttons'>
        {/* 編集ボタン */}
       <button 
          className="edit-button" 
          onClick={handleEditClick}
        >
          編集
        </button>

        {/* 削除ボタン */}
        <button 
          className="delete-button" 
          onClick={handleDeleteClick}
        >
          削除
        </button>
      </div>
       
      
     {/* 詳細ページのコンテナ */}
     <div className="detail-container">
        <JobSearcherDetailCard jobSearcher={jobSearcherData} />
      </div>
    </>
  );
}

export default JobSearcherDetailPage