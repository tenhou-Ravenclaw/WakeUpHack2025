import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigateのインポートを追加
import UpperBar from "../../components/upperBar/UpperBar";
import "./jobSearcherEditPage.css";

/**
 * 被就職支援者の情報を編集するページ
 * @param {object} props
 * @param {object} props.jobSearcher - 被就職支援者情報
 * @param {function} props.onSave - 情報保存時に呼ばれるコールバック
 * @returns
 */
const JobSearcherEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 詳細ページから渡されたデータを取得
  const [jobSearcher, setJobSearcher] = useState(
    location.state || {
      name: "",
      dob: "",
      gender: "",
      activityRange: "",
      transport: [],
    }
  );

  // 名前、活動範囲などを編集できるように状態を管理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSearcher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 移動手段の選択を管理する
  const handleTransportChange = (event) => {
    const { value, checked } = event.target;
    setJobSearcher((prev) => ({
      ...prev,
      transport: checked
        ? [...prev.transport, value]
        : prev.transport.filter((item) => item !== value),
    }));
  };

  // 保存ボタンが押された場合の処理
  const handleSave = () => {
    console.log("保存しました:", jobSearcher);
    // ここで保存処理を実装、例えばAPIを呼んでデータを更新
    // 保存が完了したら詳細ページに戻す
    navigate("/mypage/jobsearcher/detail", { state: jobSearcher });
  };

  // キャンセルボタンが押された場合の処理
  const handleCancel = () => {
    navigate("/mypage/jobsearcher/detail");
  };

  return (
    <>
      <UpperBar
        titleName={"【編集ページ】"}
        subTitleName={"被就職支援者編集"}
        buttonLabel={"一覧へ戻る"}
      />
      <div className="job-searcher-edit-page">
        <div className="edit-form">
          <div className="form-item">
            <label>氏名：</label>
            <input
              type="text"
              name="name"
              value={jobSearcher.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>生年月日：</label>
            <input
              type="date"
              name="dob"
              value={jobSearcher.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>性別：</label>
            <input
              type="text"
              name="gender"
              value={jobSearcher.gender}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>活動範囲：</label>
            <input
              type="text"
              name="activityRange"
              value={jobSearcher.activityRange}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>移動手段：</label>
            <div>
              {["徒歩", "自転車", "自動車", "電車", "その他"].map((option) => (
                <div key={option} className="transport-option">
                  <input
                    type="checkbox"
                    value={option}
                    checked={jobSearcher.transport.includes(option)}
                    onChange={handleTransportChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-buttons">
            <button className="save-button" onClick={handleSave}>保存</button>
            <button className="cancel-button" onClick={handleCancel}>キャンセル</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSearcherEditPage;
