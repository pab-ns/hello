  async function fetchProjects() {
    try {
      // Fetch the CSV file
      const response = await fetch("works.csv");
      const csvText = await response.text();
      // Convert CSV to array of objects
      const projects = csvToArray(csvText);
      // Get container
      const container = document.getElementById("work-container");
      // Loop through projects and create elements
      projects.forEach((project, index) => {
        const projectElement = document.createElement("a");
        projectElement.href = project.href;
        projectElement.target = "_blank";
        projectElement.className = "hover:border-[0.1rem] border-neutral-400 rounded-xl duration-300";
        projectElement.id = `work${index + 1}`; // Unique ID
        projectElement.innerHTML = `
          <img src="${project.img}" alt="${project.name}" class="w-auto rounded-xl shadow-md">
          <div class="py-4 space-y-1 ml-2">
            <p class="text-sm text-neutral-900">${project.name}</p>
            <p class="text-xxs font-mono text-neutral-500">${project.category}</p>
          </div>
        `;
        container.appendChild(projectElement);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }
  // Convert CSV to an array of objects
  function csvToArray(csvText) {
    const rows = csvText.split("\n").slice(1); // Skip header
    return rows.map(row => {
      const [name, category, href, img] = row.split(",");
      return { name, category, href, img };
    });
  }
  // Call function on page load
  fetchProjects();
