window.onscroll = function() {
    document.getElementById("scrollBtn").style.display = window.scrollY > 500 ? "block" : "none";
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior:"smooth" });
}