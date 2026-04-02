import { nodes } from "../data/nodes.js";
import { links } from "../data/links.js";
import { relationLabels } from "../data/relation-labels.js";
import {
  getNodeColor,
  nodeMatchesVisibleBlocs,
  linkMatchesVisibleFilters
} from "./helpers.js";
import { showFicheForNode } from "./fiche.js";

let svg, container, link, node, relationText, zoom, simulation;
let currentTransform = d3.zoomIdentity;

function createZoneBackgrounds() {
  const zones = container.append("g").attr("class", "zones");

  zones.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 470)
    .attr("height", 900)
    .attr("fill", "var(--c-zone-certification)");

  zones.append("rect")
    .attr("x", 470)
    .attr("y", 0)
    .attr("width", 440)
    .attr("height", 900)
    .attr("fill", "var(--c-zone-etablissement)");

  zones.append("rect")
    .attr("x", 910)
    .attr("y", 0)
    .attr("width", 490)
    .attr("height", 900)
    .attr("fill", "var(--c-zone-employeur)");

  zones.append("text")
    .attr("class", "zone-title")
    .attr("x", 30)
    .attr("y", 42)
    .text("Certification");

  zones.append("text")
    .attr("class", "zone-title")
    .attr("x", 500)
    .attr("y", 42)
    .text("Établissement");

  zones.append("text")
    .attr("class", "zone-title")
    .attr("x", 940)
    .attr("y", 42)
    .text("Employeur / branche");

  zones.append("text")
    .attr("class", "zone-subtitle")
    .attr("x", 30)
    .attr("y", 62)
    .text("Codes de description et de qualification");

  zones.append("text")
    .attr("class", "zone-subtitle")
    .attr("x", 500)
    .attr("y", 62)
    .text("Codes d’identification des structures");

  zones.append("text")
    .attr("class", "zone-subtitle")
    .attr("x", 940)
    .attr("y", 62)
    .text("Codes économiques et conventionnels");
}

function createArrowMarker() {
  let defs = container.select("defs");
  if (defs.empty()) {
    defs = container.insert("defs", ":first-child");
  }

  defs.selectAll("marker#arrow").remove();

  defs.append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 24)
    .attr("refY", 0)
    .attr("markerWidth", 7)
    .attr("markerHeight", 7)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#8b8b8b");
}

function createLinks() {
  link = container.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "#8b8b8b")
    .attr("stroke-width", d => d.relation === "correspondance_partielle" ? 1.5 : 1.8)
    .attr("stroke-dasharray", d => d.style === "dashed" ? "6,4" : null)
    .attr("marker-end", "url(#arrow)");

  link.append("title")
    .text(d => {
      const srcId = typeof d.source === "object" ? d.source.id : d.source;
      const tgtId = typeof d.target === "object" ? d.target.id : d.target;
      const relation = relationLabels[d.relation] || d.relation;
      const context = d.context ? ` (${d.context})` : "";
      return `${srcId} → ${tgtId} · ${relation}${context}`;
    });
}

function drawShape(selection, d) {
  const color = getNodeColor(d);

  if (d.type === "identifiant") {
    selection.append("rect")
      .attr("class", "shape")
      .attr("width", d.pivot ? 58 : 38)
      .attr("height", d.pivot ? 30 : 22)
      .attr("x", d.pivot ? -29 : -19)
      .attr("y", d.pivot ? -15 : -11)
      .attr("rx", 999)
      .attr("fill", color)
      .attr("opacity", 0.95);
  } else {
    selection.append("circle")
      .attr("class", "shape")
      .attr("r", d.pivot ? 20 : 16)
      .attr("fill", color)
      .attr("opacity", 0.9);
  }
}

function createNodes() {
  node = container.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(
      d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  node.each(function(d) {
    drawShape(d3.select(this), d);
  });

  node.append("text")
    .attr("dy", d => d.type === "identifiant" ? 30 : 30)
    .attr("text-anchor", "middle")
    .text(d => d.id);

  node.append("title")
    .text(d => `${d.id} — ${d.label}`);

  node.on("click", (event, d) => {
    event.preventDefault();
    event.stopPropagation();
    showFicheForNode(d.id);
  });
}

function createRelationLabels() {
  relationText = container.append("g")
    .attr("class", "relation-labels")
    .selectAll("text")
    .data(links)
    .enter()
    .append("text")
    .attr("class", "relation-label")
    .attr("text-anchor", "middle")
    .text(d => relationLabels[d.relation] || d.relation);
}

function getTargetX(d) {
  if (d.id === "RNCP") return 260;
  if (["ROME", "NSF", "Formacode", "CEC"].includes(d.id)) return 120;
  if (["CFD", "MEF", "CodeSISE"].includes(d.id)) return 330;
  if (d.id === "SIRET") return 680;
  if (["UAI", "NDA"].includes(d.id)) return 560;
  if (["IDCC", "NAFAPE", "CRIS"].includes(d.id)) return 1140;
  if (d.id === "NPEC") return 1000;
  return 700;
}

function getTargetY(d) {
  if (d.id === "RNCP") return 260;
  if (d.id === "ROME") return 150;
  if (d.id === "NSF") return 260;
  if (d.id === "Formacode") return 370;
  if (d.id === "CEC") return 480;

  if (d.id === "CFD") return 260;
  if (d.id === "MEF") return 150;
  if (d.id === "CodeSISE") return 370;

  if (d.id === "SIRET") return 320;
  if (d.id === "UAI") return 190;
  if (d.id === "NDA") return 450;

  if (d.id === "IDCC") return 220;
  if (d.id === "NAFAPE") return 350;
  if (d.id === "CRIS") return 500;

  if (d.id === "NPEC") return 260;

  return 450;
}

function setupSimulation() {
  simulation = d3.forceSimulation(nodes)
    .force("link",
      d3.forceLink(links)
        .id(d => d.id)
        .distance(d => d.relation === "correspondance_partielle" ? 160 : 140)
        .strength(0.6)
    )
    .force("charge", d3.forceManyBody().strength(-850))
    .force("collision", d3.forceCollide().radius(d => d.pivot ? 64 : 42))
    .force("x", d3.forceX(d => getTargetX(d)).strength(0.24))
    .force("y", d3.forceY(d => getTargetY(d)).strength(0.24))
    .force("center", d3.forceCenter(700, 450));

  const tickListener = () => {
    link
      .attr("x1", d => d.source.x || 0)
      .attr("y1", d => d.source.y || 0)
      .attr("x2", d => d.target.x || 0)
      .attr("y2", d => d.target.y || 0);

    node
      .attr("transform", d => `translate(${d.x || 0},${d.y || 0})`);

    relationText
      .attr("x", d => ((d.source.x || 0) + (d.target.x || 0)) / 2)
      .attr("y", d => ((d.source.y || 0) + (d.target.y || 0)) / 2 - 8);
  };

  simulation.on("tick", tickListener);
  simulation.alpha(1).restart();

  for (let i = 0; i < 120; i++) {
    simulation.tick();
    tickListener();
  }

  simulation.alpha(0);
  simulation.stop();
}

function setupZoom() {
  zoom = d3.zoom()
    .scaleExtent([0.25, 4])
    .on("zoom", event => {
      currentTransform = event.transform;
      container.attr("transform", currentTransform);
    });

  svg.call(zoom);
}

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.2).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

export function updateVisibility() {
  if (!node || !link || !relationText) return;

  node.classed("hidden", d => !nodeMatchesVisibleBlocs(d));
  link.classed("hidden", d => !linkMatchesVisibleFilters(d));
  relationText.classed("hidden", d => !linkMatchesVisibleFilters(d));

  clearDimStates();
}

function clearDimStates() {
  node.classed("dimmed", false).classed("highlight", false);
  link.classed("dimmed", false).classed("highlight", false);
  relationText.classed("dimmed", false);
}

export function filterById(fuse) {
  if (!fuse) return;

  const input = document.getElementById("filter-id").value.trim();
  if (!input) {
    clearFilter();
    return;
  }

  const result = fuse.search(input);
  if (!result.length) {
    clearFilter();
    return;
  }

  const match = result[0].item;
  const nodeId = match.id;
  const connectedNodeIds = new Set([nodeId]);

  links.forEach(l => {
    const sourceId = typeof l.source === "object" ? l.source.id : l.source;
    const targetId = typeof l.target === "object" ? l.target.id : l.target;
    if ((sourceId === nodeId || targetId === nodeId) && linkMatchesVisibleFilters(l)) {
      connectedNodeIds.add(sourceId);
      connectedNodeIds.add(targetId);
    }
  });

  node.each(function(d) {
    const isVisible = nodeMatchesVisibleBlocs(d);
    const isConnected = connectedNodeIds.has(d.id);

    d3.select(this)
      .classed("hidden", !isVisible)
      .classed("dimmed", isVisible && !isConnected)
      .classed("highlight", isConnected);
  });

  link.each(function(d) {
    const isVisible = linkMatchesVisibleFilters(d);
    const sourceId = typeof d.source === "object" ? d.source.id : d.source;
    const targetId = typeof d.target === "object" ? d.target.id : d.target;
    const isConnected = sourceId === nodeId || targetId === nodeId;

    d3.select(this)
      .classed("hidden", !isVisible)
      .classed("dimmed", isVisible && !isConnected)
      .classed("highlight", isConnected);
  });

  relationText.each(function(d) {
    const isVisible = linkMatchesVisibleFilters(d);
    const sourceId = typeof d.source === "object" ? d.source.id : d.source;
    const targetId = typeof d.target === "object" ? d.target.id : d.target;
    const isConnected = sourceId === nodeId || targetId === nodeId;

    d3.select(this)
      .classed("hidden", !isVisible)
      .classed("dimmed", isVisible && !isConnected);
  });

  const targetNode = nodes.find(n => n.id === nodeId);
  if (targetNode) focusOnNode(targetNode);
}

function focusOnNode(targetNode) {
  const scale = currentTransform.k || 1;
  const svgNode = svg.node();
  if (!svgNode) return;

  const rect = svgNode.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const tx = centerX - (targetNode.x * scale);
  const ty = centerY - (targetNode.y * scale);

  const transform = d3.zoomIdentity.translate(tx, ty).scale(scale);
  svg.transition().duration(500).call(zoom.transform, transform);
}

export function clearFilter() {
  document.getElementById("filter-id").value = "";
  updateVisibility();
}

export function exportSvg() {
  const svgEl = document.querySelector("svg");
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgEl);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mapping-codes-usages-dependances-apprentissage.svg";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function zoomIn() {
  svg.transition().duration(250).call(zoom.scaleBy, 1.25);
}

export function zoomOut() {
  svg.transition().duration(250).call(zoom.scaleBy, 0.8);
}

export function resetZoom() {
  svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
}

export function initializeGraph() {
  const svgElement = document.querySelector(".graph-container svg");
  if (!svgElement) return;

  svg = d3.select(svgElement);
  svg.selectAll("*").remove();

  container = svg.append("g").attr("class", "graph-root");

  createZoneBackgrounds();
  createArrowMarker();
  createLinks();
  createRelationLabels();
  createNodes();
  setupZoom();
  setupSimulation();
}
