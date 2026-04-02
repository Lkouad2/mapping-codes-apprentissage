import { nodes } from "../data/nodes.js";
import { ficheMap } from "../data/fiche-map.js";

export function showFicheForNode(nodeId) {
  const fichePopup = document.getElementById("fiche-popup");
  const ficheOverlay = document.getElementById("fiche-overlay");
  const ficheTitle = document.getElementById("fiche-title");
  const ficheContent = document.getElementById("fiche-content");

  const fiche = ficheMap[nodeId];
  const nodeData = nodes.find(n => n.id === nodeId);

  ficheTitle.textContent = fiche?.title || nodeData?.label || nodeId;

  let badges = "";
  if (nodeData) {
    badges += `<span class="fiche-badge">${nodeData.type}</span>`;
    nodeData.blocs.forEach(bloc => {
      badges += `<span class="fiche-badge">${bloc}</span>`;
    });
    if (nodeData.pivot) {
      badges += `<span class="fiche-badge">pivot</span>`;
    }
  }

  if (!fiche) {
    ficheContent.innerHTML = `
      ${badges}
      <div class="fr-alert fr-alert--info fr-mt-2w">
        <p>Aucune fiche disponible pour ce code.</p>
      </div>
    `;
  } else {
    ficheContent.innerHTML = `
      ${badges}
      <p class="fr-text--sm fr-mt-2w fr-mb-2w">
        <a href="${fiche.url}" target="_blank" rel="noopener noreferrer"
           class="fr-link fr-link--icon-right fr-icon-external-link-line">
          Ouvrir la fiche complète
        </a>
      </p>
      <iframe
        src="${fiche.url}"
        style="width:100%;height:calc(100vh - 260px);border:none;border-radius:4px;"
        loading="lazy"
        referrerpolicy="no-referrer">
      </iframe>
    `;
  }

  requestAnimationFrame(() => {
    fichePopup.style.right = "0";
    ficheOverlay.classList.add("visible");
  });
}

export function closeFiche() {
  document.getElementById("fiche-popup").style.right = "-560px";
  document.getElementById("fiche-overlay").classList.remove("visible");
}
