document.addEventListener('DOMContentLoaded', function () {
    function saveCurrentUrl() {
        var currentUrl = window.location.href;
        localStorage.setItem('lastVisitedPage', currentUrl);
    }

    var links = document.querySelectorAll('a');
    links.forEach(function (link) {
        link.addEventListener('click', saveCurrentUrl);
    });

    var backButton = document.getElementById('back');
    if (backButton) {
        backButton.addEventListener('click', function () {
            var lastUrl = localStorage.getItem('lastVisitedPage');
            if (lastUrl) {
                window.location.href = lastUrl;
            } else {
                window.history.back();
            }
        });
    }
});


const next = document.getElementById("go");

next.onclick = function() {
    window.location.href = "./niveis/niveis.html";
};