console.log("Content script injected and running.");

const solvedProblems = [];
const totalPages = 200;  

function parsePage() {
  document.querySelectorAll('a[href^="/problems/"]').forEach(anchor => {
    const problemName = anchor.textContent.trim();
    const problemLink = anchor.href;

    solvedProblems.push({ name: problemName, link: problemLink });
  });
}


function handlePagination(pageNumber) {
  if (pageNumber > totalPages) {
    const uniqueProblems = getUniqueProblems(solvedProblems);
    
    const json = JSON.stringify(uniqueProblems, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'leetcode_solved_problems.json';
    a.click();
    URL.revokeObjectURL(url);

    console.log("Download completed.");
    return;
  }

  parsePage();

  const nextButton = document.querySelector('button[aria-label="next"]');
  if (nextButton && !nextButton.disabled) {
    nextButton.click();
    setTimeout(() => handlePagination(pageNumber + 1), 3000);  
  } else {
    handlePagination(pageNumber + 1);  
  }
}

function getUniqueProblems(problems) {
  const seen = new Set();
  return problems.filter(problem => {
    const duplicate = seen.has(problem.link);
    seen.add(problem.link);
    return !duplicate;
  });
}

handlePagination(1);
