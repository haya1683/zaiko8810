import React from "react";
import { Link } from "react-router-dom";

function Help() {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>在庫管理システム - 使い方ガイド</h1>
      
      <div style={{ marginBottom: 16 }}>
        <Link to="/" style={{ 
          padding: "8px 16px", 
          backgroundColor: "#4CAF50", 
          color: "white", 
          textDecoration: "none", 
          borderRadius: "4px" 
        }}>
          在庫管理に戻る
        </Link>
      </div>
      
      <section style={{ marginBottom: 24 }}>
        <h2>🔑 ログイン方法</h2>
        <p>パスワードは「1234」です。ログイン画面で入力してください。</p>
      </section>
      
      <section style={{ marginBottom: 24 }}>
        <h2>🔍 商品の検索</h2>
        <p>検索欄に商品名を入力すると、一致する商品のみが表示されます。</p>
      </section>
      
      <section style={{ marginBottom: 24 }}>
        <h2>📦 商品の追加</h2>
        <ol>
          <li>商品名、在庫数、価格を入力します</li>
          <li>カテゴリを選択します</li>
          <li>「追加」ボタンをクリックします</li>
        </ol>
      </section>
      
      <section style={{ marginBottom: 24 }}>
        <h2>✏️ 商品の編集</h2>
        <ol>
          <li>編集したい商品の「編集」ボタンをクリックします</li>
          <li>フォームに商品情報が表示されます</li>
          <li>情報を修正し、「更新」ボタンをクリックします</li>
          <li>編集をキャンセルするには「キャンセル」ボタンをクリックします</li>
        </ol>
      </section>
      
      <section style={{ marginBottom: 24 }}>
        <h2>🗑️ 商品の削除</h2>
        <p>削除したい商品の「削除」ボタンをクリックします。削除すると元に戻せないのでご注意ください。</p>
      </section>
      
      <section style={{ marginBottom: 24 }}>
        <h2>🗂️ カテゴリの追加</h2>
        <ol>
          <li>「新しいカテゴリ」欄に追加したいカテゴリ名を入力します</li>
          <li>「追加」ボタンをクリックします</li>
          <li>追加したカテゴリが商品登録時に選択できるようになります</li>
        </ol>
      </section>
    </div>
  );
}

export default Help; 