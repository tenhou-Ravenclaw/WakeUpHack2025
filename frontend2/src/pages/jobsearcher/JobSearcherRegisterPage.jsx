import React, { useState } from "react";
import UpperBar from "../../components/upperBar/UpperBar";
import "./jobSearcherRegisterPage.css";

/**
 * 被就職支援者新規登録ページ
 * @returns
 */
const JobSearcherRegisterPage = () => {
  // フォームの状態を管理
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    sex: "",
    rangeOfBehavior: "",
    transportation: [],
  });

  // 入力値変更時の処理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // チェックボックスの選択処理
  const handleTransportationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      transportation: checked
        ? [...prev.transportation, value]
        : prev.transportation.filter((item) => item !== value),
    }));
  };

  return (
    <>
      <UpperBar titleName={"【新規登録】"} buttonLabel={"一覧へ戻る"} />
      
      {/* 新規登録ページの長方形ゾーン */}
      <div className="register-container">
        <h2>下記項目を全て入力の上登録してください。</h2>
        
        {/* 氏名 */}
        <div className="input-container">
          <label htmlFor="name">氏名:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="氏名を入力"
          />
        </div>

        {/* 生年月日 */}
        <div className="input-container">
          <label htmlFor="birthday">生年月日:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* 性別 */}
        <div className="input-container">
          <label>性別:</label>
          <div>
            <label>
              <input
                type="radio"
                name="sex"
                value="男性"
                checked={formData.sex === "男性"}
                onChange={handleChange}
              />
              男性
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="女性"
                checked={formData.sex === "女性"}
                onChange={handleChange}
              />
              女性
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="その他"
                checked={formData.sex === "その他"}
                onChange={handleChange}
              />
              その他
            </label>
          </div>
        </div>

        {/* 活動範囲 */}
        <div className="input-container">
          <label htmlFor="rangeOfBehavior">活動範囲:</label>
          <input
            type="text"
            id="rangeOfBehavior"
            name="rangeOfBehavior"
            value={formData.rangeOfBehavior}
            onChange={handleChange}
            className="input-field"
            placeholder="活動範囲を入力"
          />
        </div>

        {/* 移動手段 */}
        <div className="input-container">
          <label>移動手段:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="transportation"
                value="徒歩"
                checked={formData.transportation.includes("徒歩")}
                onChange={handleTransportationChange}
              />
              徒歩
            </label>
            <label>
              <input
                type="checkbox"
                name="transportation"
                value="自転車"
                checked={formData.transportation.includes("自転車")}
                onChange={handleTransportationChange}
              />
              自転車
            </label>
            <label>
              <input
                type="checkbox"
                name="transportation"
                value="自動車"
                checked={formData.transportation.includes("自動車")}
                onChange={handleTransportationChange}
              />
              自動車
            </label>
            <label>
              <input
                type="checkbox"
                name="transportation"
                value="電車"
                checked={formData.transportation.includes("電車")}
                onChange={handleTransportationChange}
              />
              電車
            </label>
            <label>
              <input
                type="checkbox"
                name="transportation"
                value="その他"
                checked={formData.transportation.includes("その他")}
                onChange={handleTransportationChange}
              />
              その他
            </label>
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="login-button-container">
          <button id="registerButton" type="submit">
            登録する
          </button>
        </div>
      </div>
    </>
  );
};

export default JobSearcherRegisterPage;
