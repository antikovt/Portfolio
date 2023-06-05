import projects from "./projects.json" assert { type: "json" };

const projDiv = document.getElementById("projects");

for (let project in projects) {
    const cur = projects[project];

    const card = document.createElement("div");
    card.classList.add("project", "card");
    card.setAttribute("onclick", `window.location.href='/${project}';`)

    const imgCont = document.createElement("div");
    imgCont.classList.add("image-container");

    const cont = document.createElement("div");
    cont.classList.add("project-content");

    const tags = document.createElement("div");
    tags.classList.add("tags");

    const title = document.createElement("h1");
    title.innerText = `${cur.name}`;

    const date = document.createElement("h4");
    date.innerText = `${cur.date}`;

    const desc = document.createElement("p");
    desc.innerText = `${cur.desc}`;

    for (let i = 0; i < cur.tags.length; i++) {
        const tagName = cur.tags[i];
        const tag = document.createElement("h3");
        tag.innerText = `${tagName}`;
        tags.appendChild(tag);
    }

    const img = document.createElement("img");
    const imgName = `${cur.image}`;
    img.setAttribute("src", imgName);
    imgCont.appendChild(img);

    cont.appendChild(title); cont.appendChild(date); cont.appendChild(desc);
    card.appendChild(imgCont); card.appendChild(cont); card.appendChild(tags);
    projDiv.appendChild(card);

    if (project === "Twitter") {
        const overlay = document.getElementById("twitter-overlay");
        card.setAttribute("onclick", "");
        card.onclick = () => {
            overlay.classList.toggle("visible");
        }
        overlay.onclick = () => {
            overlay.classList.toggle("visible");
        }
    }

}

document.getElementById("collapsible").onclick = e => {
    e.currentTarget.classList.toggle("collapsed");
}

if (window.innerWidth > 900) {
    document.querySelectorAll(".project").forEach(e => {
        const cols = e.querySelectorAll("div");
        if (cols[0]) {
            // A project card will grow if it's content text overflows
            // This insures that the height of the picture matches the height of the card in this case.
            cols[0].style.height = `${cols[1].clientHeight}px`;
        }
    })

    // Same as previous but onresize and not just on first render
    window.onresize = () => {
        document.querySelectorAll(".project").forEach(e => {
            const cols = e.querySelectorAll("div");
            if (cols[0]) {
                cols[0].style.height = `${cols[1].clientHeight}px`;
            }
        })
    }
}
