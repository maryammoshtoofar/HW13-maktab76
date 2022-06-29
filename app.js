const API_URL = "https://62ab6beda62365888bdc2f11.mockapi.io/Hw13";
const siteIds = [];
const projectIds = [];
const tbl = document.getElementById("targets");
const siteIdRow = document.getElementById("tableHead");

document.addEventListener("DOMContentLoaded", () => {
  getData();
});

// Fetch
const getData = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        siteIds.push(item.SiteId);
        projectIds.push(item.ProjectId);
      });
      generateSiteIdCells(sortSiteIds(siteIds));
      generateTargetArrays(
        sortSiteIds(siteIds),
        sortProjectIds(projectIds),
        data
      );
    });
};

// Sorting Functions
const sortSiteIds = (siteIds) => {
  const sortedSiteIds = [...new Set(siteIds)].sort((a, b) => {
    return a - b;
  });
  return sortedSiteIds;
};

const sortProjectIds = (projectIds) => {
  const sortedProjectIds = [...new Set(projectIds)].sort((a, b) => {
    return a - b;
  });
  return sortedProjectIds;
};

// Create and append SiteID columns using fetched data

const generateSiteIdCells = (siteIds) => {
  for (let i = 0; i < siteIds.length; i++) {
    const siteIdCell = document.createElement("th");
    siteIdCell.innerHTML = siteIds[i];
    siteIdRow.appendChild(siteIdCell);
  }
  tbl.appendChild(siteIdRow);
};

// Generate an array consisting of ProjectIds + Targets

const generateTargetArrays = (siteIds, projectIds, data) => {
  for (let i = 0; i < projectIds.length; i++) {
    const targetArray = [];
    targetArray.push(projectIds[i]);
    for (let j = 0; j < siteIds.length; j++) {
      for (let item of data) {
        if (item.ProjectId === projectIds[i] && item.SiteId === siteIds[j]) {
          targetArray.push(item.Target);
        }
      }
    }

    generateTargetCells(targetArray);
  }
};

// Create and Append all cells using the previously made array

const generateTargetCells = (targetArray) => {
  const targetRow = document.createElement("tr");
  for (let i = 0; i < targetArray.length; i++) {
    const targetCells = document.createElement("td");
    targetCells.innerHTML = targetArray[i];
    targetRow.appendChild(targetCells);
  }
  tbl.appendChild(targetRow);
};
