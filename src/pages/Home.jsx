import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialProducts = [
  { id: 1, name: "商品A", stock: 10, price: 1000, category: "食品" },
  { id: 2, name: "商品B", stock: 5, price: 2000, category: "家電" },
];

function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["食品", "家電"]);
  const [newCategory, setNewCategory] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // 商品追加・更新
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || stock === "" || price === "" || !category || stock < 0 || price < 0) {
      alert("すべての項目を正しく入力してください。");
      return;
    }
    const newProduct = {
      id: editId ?? (products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1),
      name,
      stock: Number(stock),
      price: Number(price),
      category,
    };
    if (editId === null) {
      setProducts([...products, newProduct]);
    } else {
      setProducts(products.map((p) => (p.id === editId ? newProduct : p)));
      setEditId(null);
    }
    setName("");
    setStock("");
    setPrice("");
    setCategory("");
  };

  // 編集
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setStock(product.stock);
    setPrice(product.price);
    setCategory(product.category);
  };

  // 削除
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    if (editId === id) handleCancel();
  };

  // 編集キャンセル
  const handleCancel = () => {
    setEditId(null);
    setName("");
    setStock("");
    setPrice("");
    setCategory("");
  };

  // カテゴリ削除
  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter((c) => c !== categoryToDelete));
    if (category === categoryToDelete) setCategory("");
    if (searchCategory === categoryToDelete) setSearchCategory("");
    setCategoryToDelete(null);
  };

  // 商品フィルタ・ソート
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (searchCategory ? p.category === searchCategory : true)
  );
  const sortedProducts = [...filteredProducts];
  if (sortConfig.key !== null) {
    sortedProducts.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
    });
  }
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  // CSV出力
  const exportToCSV = () => {
    const header = ["ID", "商品名", "在庫数", "価格", "カテゴリ"];
    const rows = sortedProducts.map((p) => [p.id, p.name, p.stock, p.price, p.category]);
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    // BOMを付与
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvContent], { type: "text/csv;charset=utf-8;" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `products.csv`;
    downloadLink.click();
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>在庫管理システム</h1>
      <div style={{ marginBottom: 16 }}>
        <Link to="/help" style={{ padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "4px" }}>
          使い方ガイド
        </Link>
      </div>
      <input
        type="text"
        placeholder="商品名で検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, padding: 4, width: "100%" }}
      />
      <div style={{ marginBottom: 16 }}>
        <select onChange={(e) => setSearchCategory(e.target.value)} value={searchCategory}>
          <option value="">全カテゴリ</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
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
            if (newCategory.trim() !== "" && !categories.includes(newCategory.trim())) {
              setCategories([...categories, newCategory.trim()]);
              setNewCategory("");
            }
          }}
        >
          追加
        </button>
        {newCategory && (
          <button onClick={() => setNewCategory("")} style={{ marginLeft: 8 }}>
            キャンセル
          </button>
        )}
        <div style={{ marginTop: 12 }}>
          {categories.map((c) => (
            <span key={c} style={{ display: "inline-block", marginRight: 8, background: "#f0f0f0", padding: "2px 8px", borderRadius: 4 }}>
              {c}
              <button onClick={() => setCategoryToDelete(c)} style={{ marginLeft: 4, color: "red", border: "none", background: "transparent", cursor: "pointer" }}>×</button>
            </span>
          ))}
        </div>
        {/* カテゴリ削除確認ダイアログ */}
        {categoryToDelete && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "white", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
              <p>「{categoryToDelete}」を削除しますか？</p>
              <button onClick={() => handleDeleteCategory(categoryToDelete)} style={{ marginRight: 12, background: "#d32f2f", color: "white", border: "none", padding: "6px 16px", borderRadius: 4 }}>はい</button>
              <button onClick={() => setCategoryToDelete(null)} style={{ background: "#aaa", color: "white", border: "none", padding: "6px 16px", borderRadius: 4 }}>いいえ</button>
            </div>
          </div>
        )}
      </div>
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">カテゴリを選択</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit">{editId === null ? "追加" : "更新"}</button>
        {editId !== null && (
          <button type="button" onClick={handleCancel} style={{ marginLeft: 8 }}>
            キャンセル
          </button>
        )}
      </form>
      <div style={{ marginBottom: 20 }}>
        <button onClick={exportToCSV}>CSV出力</button>
      </div>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>商品名</th>
            <th onClick={() => handleSort("stock")}>在庫数</th>
            <th onClick={() => handleSort("price")}>価格</th>
            <th onClick={() => handleSort("category")}>カテゴリ</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td style={{ color: p.stock <= 3 ? "red" : "black" }}>{p.stock}</td>
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

export default Home; 