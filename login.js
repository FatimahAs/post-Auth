//document.addEventListener("DOMContentLoaded", () => {
const signinBtn = document.getElementById("signinBtn");
const createPostBtn = document.getElementById("createPostBtn");
const logoutBtn = document.getElementById("logoutBtn");


if (!signinBtn || !createPostBtn || !logoutBtn) {
    console.error("لم يتم العثور على أحد العناصر المطلوبة");
    return;
}

signinBtn.addEventListener("click", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("يرجى تعبئة جميع الحقول");
        return;
    }

    try {
        const response = await fetch("https://682199f9259dad2655afc0f9.mockapi.io/Post");
        const users = await response.json();

        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
            return;
        }

        localStorage.setItem("loggedUserId", user.id);
        alert("تم تسجيل الدخول بنجاح!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("خطأ أثناء تسجيل الدخول:", error);
        alert("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    }
});


const loggedUserId = localStorage.getItem("loggedUserId");
if (loggedUserId) {
    createPostBtn.style.display = "block";
    logoutBtn.style.display = "block";

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedUserId");
        window.location.href = "index.html";
    });

    createPostBtn.addEventListener("click", () => {
        window.location.href = "createPost.html";
    });
} else {
    window.location.href = "index.html";
}
//});