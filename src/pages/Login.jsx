import React, { useState } from "react";

function Login({ onLogin }) {
  const [inputPassword, setInputPassword] = useState("");
  const PASSWORD = "1234";

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPassword === PASSWORD) {
      onLogin();
    } else {
      alert("パスワードが違います");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="パスワード"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default Login; 