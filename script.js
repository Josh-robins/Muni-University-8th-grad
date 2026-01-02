document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('nameInput').value.trim();
    if (!query) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<p class="error">Please enter a name to search.</p>';
        return;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Searching...</p>';

    try {
        const response = await fetch(`search.php?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        resultsDiv.innerHTML = '';
        if (data.error) {
            resultsDiv.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
            data.slice(0, 5).forEach(person => {  // Limit to top 5 matches
                const div = document.createElement('div');
                div.className = 'result';
                div.innerHTML = `
                    <h3>${person.name}</h3>
                    <p><strong>Program:</strong> ${person.program}</p>
                    <p><em>Congrats on graduating November 2025.</em></p>
                    <p class="disclaimer"><small>Disclaimer: This is an unofficial learning project and not published by Muni University. For official records, contact the university directly.</small></p>
                `;
                resultsDiv.appendChild(div);
            });
            if (data.length > 5) {
                resultsDiv.innerHTML += '<p><em>... and more matches. Refine your search.</em></p>';
            }
        }
    } catch (error) {
        resultsDiv.innerHTML = '<p class="error">Error: Check server connection.</p>';
    }
});