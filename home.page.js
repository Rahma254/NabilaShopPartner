document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");

  root.innerHTML = `
    <section class="home">
      <h1>Selamat datang di <span class="highlight">Nabila Shop</span></h1>
      <p>Kami siap bantu jualan kamu dengan sistem canggih dan cepat.</p>
      <button id="mulaiBelanja">Mulai Sekarang</button>
    </section>
  `;

  document.getElementById("mulaiBelanja").addEventListener("click", () => {
    alert("Ayo mulai jualan! 🚀");
    // Kamu bisa redirect ke halaman katalog atau login di sini
    // window.location.href = "/dashboard.html";
  });
});
