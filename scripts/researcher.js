// Fetch stats from researcher.json and update research-stats
async function updateScholarStats() {
  const apiKey = "78a72e5ef1944f5542907be6f8cc07edac58ab762cd707decd5415b814093ac5"; // 
  const userId = "qoeSgwkAAAAJ";
  const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${userId}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Extract stats
    const author = data.author || {};
    const publications = author.publications_count || "N/A";
    const citations = author.cited_by?.table?.find(stat => stat.name === "Citations")?.value || author.cited_by?.total || "N/A";
    const hIndex = author.cited_by?.table?.find(stat => stat.name === "h-index")?.value || author.h_index || "N/A";

    // Update DOM
    document.querySelector('.stat-number.publications').textContent = publications;
    document.querySelector('.stat-number.citations').textContent = citations;
    document.querySelector('.stat-number.h-index').textContent = hIndex;
  } catch (error) {
    console.error("Failed to fetch Google Scholar stats:", error);
    document.querySelector('.stat-number.publications').textContent = "N/A";
    document.querySelector('.stat-number.citations').textContent = "N/A";
    document.querySelector('.stat-number.h-index').textContent = "N/A";
  }
}

// Call the function on page load
updateScholarStats();
