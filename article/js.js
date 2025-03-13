let lastScrollTop = 0;
    const backToHome = document.querySelector(".back-to-home");

    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scroll ke bawah, sembunyikan tombol
            backToHome.style.transform = "translateY(-100px)";
            backToHome.style.opacity = "0";
        } else {
            // Scroll ke atas, tampilkan tombol
            backToHome.style.transform = "translateY(0)";
            backToHome.style.opacity = "1";
        }

        lastScrollTop = scrollTop;
    });