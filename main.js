//document.addEventListener("DOMContentLoaded", async() => {

const loggedUserId = localStorage.getItem("loggedUserId");

if (!loggedUserId) {
    window.location.href = "index.html";
    return;
}

try {

    const response = await fetch(`https://682199f9259dad2655afc0f9.mockapi.io/Post/${loggedUserId}`);
    const user = await response.json();

    if (!user) {

        window.location.href = "signin.html";
        return;
    }


    const createPostBtn = document.getElementById("createPostBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    createPostBtn.style.display = "block";
    logoutBtn.style.display = "block";


    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedUserId");
        window.location.href = "signin.html";
    });


    createPostBtn.addEventListener("click", () => {
        window.location.href = "createPost.html";
    });
} catch (error) {
    console.error("حدث خطأ أثناء التحقق من المستخدم عبر الـ API:", error);
    window.location.href = "signin.html";
}
//});