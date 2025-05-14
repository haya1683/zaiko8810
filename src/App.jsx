import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "商品A", stock: 10, price: 1000 },
  { id: 2, name: "商品B", stock: 5, price: 2000 },
];

function App() {
  // ログイン用
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const PASSWORD = "1234";

  // 在庫管理用
  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  // ログイン処理
  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPassword === PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("パスワードが違います");
    }
  };

  // 商品追加または更新
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !stock || !price) return;

    if (editId === null) {
      // 追加
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        stock: Number(stock),
        price: Number(price),
      };
      setProducts([...products, newProduct]);
    } else {
      // 更新
      setProducts(
        products.map((p) =>
          p.id === editId
            ? { ...p, name, stock: Number(stock), price: Number(price) }
            : p
        )
      );
      setEditId(null);
    }
    setName("");
    setStock("");
    setPrice("");
  };

  // 編集ボタン押下時
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setStock(product.stock);
    setPrice(product.price);
  };

  // 削除ボタン押下時
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    if (editId === id) {
      setEditId(null);
      setName("");
      setStock("");
      setPrice("");
    }
  };

  // キャンセル
  const handleCancel = () => {
    setEditId(null);
    setName("");
    setStock("");
    setPrice("");
  };

  // ログイン画面
  if (!isLoggedIn) {
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

  // 在庫管理画面
  return (
    <div style={{ padding: 24 }}>
      <h1>在庫管理システム</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="商品名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="在庫数"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="number"
          placeholder="価格"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">{editId === null ? "追加" : "更新"}</button>
        {editId !== null && (
          <button type="button" onClick={handleCancel} style={{ marginLeft: 8 }}>
            キャンセル
          </button>
        )}
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>商品名</th>
            <th>在庫数</th>
            <th>価格</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>{p.price}円</td>
              <td>
                <button onClick={() => handleEdit(p)}>編集</button>
                <button onClick={() => handleDelete(p.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;