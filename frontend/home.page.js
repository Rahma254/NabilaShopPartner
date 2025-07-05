// Ambil isi file HTML dan inject ke #app
fetch("frontend/home.page.html")
  .then(res => res.text())
  
  .then(html => {
    document.getElementById("app").innerHTML = html;

    // Event listener setelah HTML masuk
    document.getElementById("mulaiBelanja").addEventListener("click", () => {
      alert("Kamu siap belanja dengan gaya 😎");
    });
  });
