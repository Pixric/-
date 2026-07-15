/* ===========================
   贪睡 · Personal Website
   script.js
=========================== */

const GITHUB_USERNAME = "Pixric";

/* -------------------------
   GitHub 仓库
-------------------------- */

async function loadRepos() {

    const container = document.getElementById("repos");

    try {

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );

        const repos = await response.json();

        container.innerHTML = "";

        repos.forEach(repo => {

            const card = document.createElement("div");

            card.className = "repo fade";

            card.innerHTML = `

                <a href="${repo.html_url}" target="_blank">
                    ${repo.name}
                </a>

                <p>
                    ${repo.description ?? "暂无介绍"}
                </p>

            `;

            container.appendChild(card);

        });

        observeFade();

    } catch (err) {

        console.error(err);

        container.innerHTML = `
            <p style="color:#888;">
                GitHub 数据加载失败
            </p>
        `;

    }

}

/* -------------------------
   滚动渐入动画
-------------------------- */

function observeFade() {

    const elements = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .12

    });

    elements.forEach(el => observer.observe(el));

}

/* -------------------------
   导航栏滚动效果
-------------------------- */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 20) {

        navbar.style.background = "rgba(255,255,255,.82)";
        navbar.style.boxShadow = "0 18px 40px rgba(0,0,0,.08)";

    } else {

        navbar.style.background = "rgba(255,255,255,.65)";
        navbar.style.boxShadow = "0 18px 40px rgba(0,0,0,.05)";

    }

});

/* -------------------------
   鼠标轻微视差
-------------------------- */

document.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - .5) * 10;
    const y = (e.clientY / window.innerHeight - .5) * 10;

    document.querySelectorAll(".card").forEach(card => {

        card.style.transform =
            `translate(${x * .15}px,${y * .15}px)`;

    });

});

/* -------------------------
   卡片恢复
-------------------------- */

document.addEventListener("mouseleave", () => {

    document.querySelectorAll(".card").forEach(card => {

        card.style.transform = "";

    });

});

/* -------------------------
   图片淡入
-------------------------- */

document.querySelectorAll("img").forEach(img => {

    img.onload = () => {

        img.animate(

            [
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }

            ],

            {
                duration: 600,
                fill: "forwards",
                easing: "ease"
            }

        );

    };

});

/* -------------------------
   初始化
-------------------------- */

window.addEventListener("DOMContentLoaded", () => {

    loadRepos();

    observeFade();

});
