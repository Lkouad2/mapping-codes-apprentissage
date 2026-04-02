import { nodes } from "./data/nodes.js";
import { links } from "./data/links.js";
import { relationLabels } from "./data/relation-labels.js";
import { initializeGraph, updateVisibility, filterById, clearFilter, exportSvg, zoomIn, zoomOut, resetZoom } from "./graph/graph.js";
import { closeFiche } from "./graph/fiche.js";

let fuse;

function initializeRelationFilters() {
  const container = document.getElementById("relation-filters");
  const uniqueRelations = [...new Set(links.map(l => l.relation))];

  container.innerHTML = uniqueRelations.map(rel => `
    <div class="fr-checkbox-group fr-checkbox-group--sm">
      <input type="checkbox" id="rel-${rel}" checked data-relation="${rel}">
      <label class="fr-label" for="rel-${rel}">
        ${relationLabels[rel] || rel}
      </label>
    </div>
  `).join("");
}

function populateDatalist() {
  const datalist = document.getElementById("nodes-list");
  datalist.innerHTML = "";
  nodes.forEach(n => {
    const option = document.createElement("option");
    option.value = n.id;
    datalist.appendChild(option);
  });
}

function initializeFuse() {
  fuse = new Fuse(nodes, {
    keys: ["id", "label"],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2
  });
}

function setupInteractions() {
  document.getElementById("btn-filter").addEventListener("click", () => filterById(fuse));
  document.getElementById("btn-clear").addEventListener("click", clearFilter);
  document.getElementById("btn-zoom-out").addEventListener("click", zoomOut);
  document.getElementById("btn-reset-zoom").addEventListener("click", resetZoom);
  document.getElementById("btn-zoom-in").addEventListener("click", zoomIn);
  document.getElementById("btn-export").addEventListener("click", exportSvg);
  document.getElementById("fiche-overlay").addEventListener("click", closeFiche);
  document.getElementById("btn-close-fiche").addEventListener("click", closeFiche);

  document.querySelectorAll(".filter-blocs input, .filter-relations input").forEach(input => {
    input.addEventListener("change", updateVisibility);
  });

  document.getElementById("filter-id").addEventListener("keypress", e => {
    if (e.key === "Enter") filterById(fuse);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (typeof d3 === "undefined") throw new Error("D3.js n'est pas chargé");
    if (typeof Fuse === "undefined") throw new Error("Fuse.js n'est pas chargé");

    if (window.dsfr?.start) window.dsfr.start();

    initializeRelationFilters();
    populateDatalist();
    initializeFuse();
    initializeGraph();
    setupInteractions();
    updateVisibility();
  } catch (error) {
    console.error("Erreur d'initialisation :", error);
  }
});
