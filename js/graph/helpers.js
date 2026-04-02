import { nodes } from "../data/nodes.js";

export function getColorByBloc(bloc) {
  if (bloc === "certification") return "#4a90e2";
  if (bloc === "etablissement") return "#2ecc71";
  if (bloc === "employeur") return "#f39c12";
  return "#888";
}

export function getNodeColor(d) {
  if (d.blocs.length === 1) return getColorByBloc(d.blocs[0]);
  return "#7b61ff";
}

export function getVisibleBlocs() {
  return new Set(
    Array.from(document.querySelectorAll(".filter-blocs input:checked"))
      .map(input => input.dataset.bloc)
  );
}

export function getVisibleRelations() {
  return new Set(
    Array.from(document.querySelectorAll(".filter-relations input:checked"))
      .map(input => input.dataset.relation)
  );
}

export function nodeMatchesVisibleBlocs(d) {
  const visibleBlocs = getVisibleBlocs();
  return d.blocs.some(bloc => visibleBlocs.has(bloc));
}

export function linkMatchesVisibleFilters(d) {
  const visibleBlocs = getVisibleBlocs();
  const visibleRelations = getVisibleRelations();

  const sourceId = typeof d.source === "object" ? d.source.id : d.source;
  const targetId = typeof d.target === "object" ? d.target.id : d.target;
  const sourceNode = nodes.find(n => n.id === sourceId);
  const targetNode = nodes.find(n => n.id === targetId);

  if (!sourceNode || !targetNode) return false;

  const sourceVisible = sourceNode.blocs.some(bloc => visibleBlocs.has(bloc));
  const targetVisible = targetNode.blocs.some(bloc => visibleBlocs.has(bloc));

  return sourceVisible && targetVisible && visibleRelations.has(d.relation);
}
