/*--------- Smooth nav link transition ---------*/
document.querySelectorAll('.nav_links a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });

        $(".nav_links a").removeClass("active");
        $(this).addClass("active");
    });
});