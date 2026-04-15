document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('videoContainer');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    const noData = document.getElementById('noData');

    let videoData = [];

    async function fetchData() {
        try {
            const res = await fetch('links.json');
            videoData = await res.json();
            render(videoData);
            loader.style.display = 'none';
        } catch (err) {
            loader.innerText = "ডেটা পাওয়া যায়নি। (links.json চেক করুন)";
        }
    }

    function render(data) {
        container.innerHTML = '';
        if(data.length === 0) {
            noData.style.display = 'block';
            return;
        }
        noData.style.display = 'none';

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'v-row';
            div.innerHTML = `
                <div class="v-title">${item.title}</div>
                <a href="${item.video_link}" target="_blank" class="v-btn">
                    দেখুন <i class="fa-solid fa-external-link-alt"></i>
                </a>
            `;
            container.appendChild(div);
        });
    }

    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        const filtered = videoData.filter(v => v.title.toLowerCase().includes(val));
        render(filtered);
    });

    fetchData();
});