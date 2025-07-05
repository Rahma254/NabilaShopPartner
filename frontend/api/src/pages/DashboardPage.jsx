// File: src/pages/partner-dashboard.jsx

import { useState } from "react"; import { createClient } from "@supabase/supabase-js"; import { v4 as uuidv4 } from "uuid";

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY );

export default function PartnerDashboard() { const [productName, setProductName] = useState(""); const [price, setPrice] = useState(""); const [stock, setStock] = useState(""); const [image, setImage] = useState(null); const [previewUrl, setPreviewUrl] = useState(null); const [uploading, setUploading] = useState(false); const [feedback, setFeedback] = useState("");

const handleImageChange = (e) => { const file = e.target.files[0]; setImage(file); setPreviewUrl(URL.createObjectURL(file)); };

const handleUpload = async () => { setUploading(true); setFeedback("");

if (!productName || !price || !stock || !image) {
  setFeedback("❌ Semua field wajib diisi.");
  setUploading(false);
  return;
}

try {
  const imageFileName = `${uuidv4()}-${image.name}`;
  const { data: imageData, error: imageError } = await supabase.storage
    .from("products_media")
    .upload(imageFileName, image);

  if (imageError) throw imageError;

  const imageUrl = `${supabase.storage
    .from("products_media")
    .getPublicUrl(imageFileName).data.publicUrl}`;

  const { error: insertError } = await supabase.from("products").insert({
    name: productName,
    price: parseFloat(price),
    stock: parseInt(stock),
    image_url: imageUrl,
  });

  if (insertError) throw insertError;

  setFeedback("✅ Produk berhasil disimpan!");
  setProductName("");
  setPrice("");
  setStock("");
  setImage(null);
  setPreviewUrl(null);
} catch (error) {
  console.error("Upload error:", error);
  setFeedback("❌ Gagal menyimpan produk.");
} finally {
  setUploading(false);
}

};

return ( <div className="p-6 max-w-md mx-auto"> <h2 className="text-xl font-bold mb-4">Tambah Produk</h2> <input type="text" placeholder="Nama Produk" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full mb-2 p-2 border rounded" /> <input type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full mb-2 p-2 border rounded" /> <input type="number" placeholder="Stok" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full mb-2 p-2 border rounded" /> <input
type="file"
accept="image/*"
onChange={handleImageChange}
className="w-full mb-2"
/> {previewUrl && ( <img src={previewUrl} alt="Preview" className="w-full mb-4 rounded" /> )} <button
onClick={handleUpload}
disabled={uploading}
className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
> {uploading ? "Mengupload..." : "Simpan Produk"} </button> {feedback && <p className="mt-4 text-center">{feedback}</p>} </div> ); }

