document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signupBtn");

    signupBtn.addEventListener("click", async function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!username || !email || !password || !confirmPassword) {
            alert("يرجى تعبئة جميع الحقول");
            return;
        }

        if (password !== confirmPassword) {
            alert("كلمتا المرور غير متطابقتين");
            return;
        }

        try {

            const response = await fetch("https://682199f9259dad2655afc0f9.mockapi.io/Post");
            const users = await response.json();

            const userExists = users.find(user => user.email === email);
            if (userExists) {
                alert("البريد الإلكتروني مستخدم بالفعل.");
                return;
            }


            const newUser = {
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            };

            await fetch("https://682199f9259dad2655afc0f9.mockapi.io/Post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            alert("تم التسجيل بنجاح! الرجاء تسجيل الدخول.");
            window.location.href = "signin.html";
        } catch (error) {
            console.error("خطأ أثناء التسجيل:", error);
            alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
        }
    });
});