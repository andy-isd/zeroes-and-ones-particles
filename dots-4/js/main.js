let animationPlayed = false;

document.addEventListener("DOMContentLoaded", function () {
    function playAnimation() {
        const pln = document.querySelector(".pln");
        pln.style.animation = "none";
        setTimeout(() => {
            pln.style.animation = "plnAnimate 4s ease";
        }, 100);
    }

    setInterval(playAnimation, 10000);

    window.addEventListener("scroll", function () {
        const menuHeader = document.querySelector(".header");
        const fly = document.querySelector(".fly");
        const scrollY = window.scrollY;

        const canvas = document.querySelector(".particles-container");

        const windowHeight = window.innerHeight;

        const design = document.querySelector(".design");
        const designHeight = design.getBoundingClientRect().top;

        if (designHeight + 400 < windowHeight && !animationPlayed) {
            animationPlayed = true;

            canvas.classList.add("active");

            const tm = gsap.timeline();

            tm.fromTo(
                ".design__title",
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: "bounce.out" }
            )
                .fromTo(
                    ".text__btn",
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: "bounce.out" }
                )
                .fromTo(
                    ".text__mute",
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: "bounce.out" }
                );
        }
    });

    anime({
        targets: ".pln",
        translateY: 15,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
    });

    anime({
        targets: ".tanks",
        translateY: 5,
        direction: "alternate",
        loop: true,
        easing: "linear",
    });

    const tm = gsap.timeline();

    tm.fromTo(
        ".header",
        { y: -400, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4 }
    )
        .fromTo(
            ".pln",
            { y: 800, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 1, ease: "bounce.out" }
        )
        .fromTo(
            ".text__title",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 }
        )
        .fromTo(
            ".line",
            { x: 300, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4 }
        )
        .fromTo(
            ".text__subtitle",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
        );
});

function playAnimation() {
    const pln = document.querySelector(".pln");
    pln.style.animation = "none";
    setTimeout(() => {
        pln.style.animation = "plnAnimate 4s ease";
    }, 100);
}

setInterval(playAnimation, 10000);

var NUM_PARTICLES = (ROWS = 170) * (COLS = 2000),
    THICKNESS = Math.pow(15, 2),
    SPACING = 4,
    MARGIN = 100,
    COLOR = 220,
    DRAG = 0.95,
    EASE = 0.25,
    /*

      used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

      B = 4 / Math.PI,
      C = -4 / Math.pow( Math.PI, 2 ),
      P = 0.225,

      */

    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx,
    dy,
    mx,
    my,
    d,
    t,
    f,
    a,
    b,
    i,
    n,
    w,
    h,
    p,
    s,
    r,
    c;

particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
};

function init() {
    container = document.querySelector(".particles-container");
    canvas = document.createElement("canvas");

    ctx = canvas.getContext("2d");
    man = false;
    tog = true;

    list = [];

    w = canvas.width = COLS * SPACING + MARGIN * 2;
    h = canvas.height = ROWS * SPACING + MARGIN * 2;
    return;
    container.style.marginLeft = Math.round(w * -0.5) + "px";
    container.style.marginTop = Math.round(h * -0.5) + "px";

    for (i = 0; i < NUM_PARTICLES; i++) {
        p = Object.create(particle);
        p.x = p.ox = MARGIN + SPACING * (i % COLS);
        p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);

        list[i] = p;
    }

    container.addEventListener("mousemove", function (e) {
        bounds = container.getBoundingClientRect();
        mx = e.clientX - bounds.left;
        my = e.clientY - bounds.top;
        man = true;
    });

    if (typeof Stats === "function") {
        document.body.appendChild((stats = new Stats()).domElement);
    }

    container.appendChild(canvas);
}

function step() {
    return;
    if (stats) stats.begin();
    if ((tog = !tog)) {
        if (!man) {
            t = +new Date() * 0.001;
            mx = w * 0.5 + Math.cos(t * 2.1) * Math.cos(t * 0.9) * w * 0.45;
            my = h * 0.5 + Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * h * 0.45;
        }

        for (i = 0; i < NUM_PARTICLES; i++) {
            p = list[i];

            d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
            f = -THICKNESS / d;

            if (d < THICKNESS) {
                t = Math.atan2(dy, dx);
                p.vx += f * Math.cos(t);
                p.vy += f * Math.sin(t);
            }

            p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
            p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
        }
    } else {
        b = (a = ctx.createImageData(w, h)).data;

        for (i = 0; i < NUM_PARTICLES; i++) {
            p = list[i];
            (b[(n = (~~p.x + ~~p.y * w) * 4)] = b[n + 1] = b[n + 2] = COLOR),
                (b[n + 3] = 255);
        }

        ctx.putImageData(a, 0, 0);
    }

    if (stats) stats.end();

    requestAnimationFrame(step);
}

init();
step();
