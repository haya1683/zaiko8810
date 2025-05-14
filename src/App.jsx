import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "商品A", stock: 10, price: 1000, category: "食品" },
  { id: 2, name: "商品B", stock: 5, price: 2000, category: "家電" },
];

function App() {
  // ログイン
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const PASSWORD = "1234";

  // 商品状態
  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  // 検索
  const [searchTerm, setSearchTerm] = useState("");

  // カテゴリ管理
  const [categories, setCategories] = useState(["食品", "家電"]);
  const [newCategory, setNewCategory] = useState("");

  // ログイン処理
  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPassword === PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("パスワードが違います");
    }
  };

  // 商品追加・更新
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !stock || !price || !category) return;

    const newProduct = {
      id:
        editId === null
          ? products.length > 0
            ? Math.max(...products.map((p) => p.id)) + 1
            : 1
          : editId,
      name,
      stock: Number(stock),
      price: Number(price),
      category,
    };

    if (editId === null) {
      setProducts([...products, newProduct]);
    } else {
      setProducts(
        products.map((p) => (p.id === editId ? newProduct : p))
      );
      setEditId(null);
    }

    setName("");
    setStock("");
    setPrice("");
    setCategory("");
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setStock(product.stock);
    setPrice(product.price);
    setCategory(product.category);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    if (editId === id) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setStock("");
    setPrice("");
    setCategory("");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div style={{ padding: 24 }}>
      <h1>在庫管理システム</h1>

      {/* 🔍 検索 */}
      <input
        type="text"
        placeholder="商品名で検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, padding: 4 }}
      />

      {/* 🗂 カテゴリ追加 */}
      <div style={{ marginBottom: 20 }}>
        <h3>カテゴリを追加</h3>
        <input
          type="text"
          placeholder="新しいカテゴリ"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            if (
              newCategory.trim() !== "" &&
              !categories.includes(newCategory.trim())
            ) {
              setCategories([...categories, newCategory.trim()]);
              setNewCategory("");
            }
          }}
        >
          追加
        </button>
      </div>

      {/* 📦 商品登録フォーム */}
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">カテゴリを選択</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit">{editId === null ? "追加" : "更新"}</button>
        {editId !== null && (
          <button
            type="button"
            onClick={handleCancel}
            style={{ marginLeft: 8 }}
          >
            キャンセル
          </button>
        )}
      </form>

      {/* 📋 商品テーブル */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>商品名</th>
            <th>在庫数</th>
            <th>価格</th>
            <th>カテゴリ</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>{p.price}円</td>
              <td>{p.category}</td>
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
