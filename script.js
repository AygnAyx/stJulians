let isScrolling = false;

// Belirtilen sayfaya yumuşak geçiş yap
function scrollToPage(pageIndex) {
    var i = pageIndex.toString();
    console.log("pageIndex", i);
    const section = document.getElementById(`page-${i}`);

    if (section) {
        isScrolling = true; // Kaydırma işlemi başlıyor
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Section with id "page-${i}" not found.`);
    }
}

// Aşağı kaydırdıkça otomatik olarak sayfayı değiştirme
let lastScrollPosition = 0; // Son kaydırma pozisyonunu takip et

window.addEventListener("scroll", function () {
    if (isScrolling) return; // Eğer bir kaydırma işlemi yapılıyorsa, çalışmasın
    let sections = document.querySelectorAll(".page-scroll");
    let currentScrollPosition = window.scrollY; // Şu anki kaydırma pozisyonu
    let scrollPosition;

    if (currentScrollPosition > lastScrollPosition) {
        // Aşağı kaydırılıyorsa
        scrollPosition = window.scrollY + window.innerHeight * 0.8; // Aşağı kaydırma için %70
    } else {
        // Yukarı kaydırılıyorsa
        scrollPosition = window.scrollY + window.innerHeight * 0.2; // Yukarı kaydırma için %30
    }

    sections.forEach((section, index) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            window.location.hash = `page-${index}`;
        }
    });

    lastScrollPosition = currentScrollPosition; // Son kaydırma pozisyonunu güncelle
});



// Kaydırma tamamlandığında event listener'ı yeniden etkinleştir
window.addEventListener("scrollend", function() {
    isScrolling = false; // Kaydırma tamamlandı
});

// Ana menüye dönme işlevi
function scrollToTop2() {
    const section = document.getElementById('page-0');
    if (section) {
        isScrolling = true; // Kaydırma işlemi başlıyor
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".floating-button");

    button.addEventListener("click", function () {
        button.classList.add("fly-away");

        // 1 saniye sonra butonu geri getir
        setTimeout(() => {
            button.classList.remove("fly-away");
        }, 2000); // 2 saniye sonra buton tekrar görünecek
    });
}); 

// Sayfa yüklendiğinde ve pencere yeniden boyutlandığında bu fonksiyonu çalıştır
window.addEventListener('load', updatePageHeight);
window.addEventListener('resize', updatePageHeight);

function toggleContent(element) {
    // Seçilen öğenin en yakın 'menu-item' kapsayıcısını bul
    const menuItem = element.closest('.menu-item');

    // O kapsayıcının içindeki 'hidden-content' divini seç
    const hiddenContent = menuItem.querySelector('.hidden-content');

    // Tüm 'hidden-content' öğelerini kapat
    document.querySelectorAll('.hidden-content').forEach(content => {
        if (content !== hiddenContent) {
            content.style.display = "none";
        }
    });

    // Eğer içerik zaten açıksa kapat, değilse aç
    hiddenContent.style.display = (hiddenContent.style.display === "block") ? "none" : "block";
}

document.querySelectorAll(".menu-image img").forEach(img => {
    img.addEventListener("click", function() {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");
        modal.style.display = "flex"; // Modalı aç
        modalImg.src = this.src; // Tıklanan resmin URL'sini modal içine ekle
    });
});

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    // Resmi modal içerisinde göster
    modalImage.src = imageSrc;

    // Modal penceresini görünür yap
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('imageModal');

    // Modal penceresini gizle
    modal.style.display = 'none';
}

