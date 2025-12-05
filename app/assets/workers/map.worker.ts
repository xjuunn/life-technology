import DottedMap from "dotted-map";

self.onmessage = () => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
        radius: 0.22,
        color: 'currentColor',
        shape: "circle",
        backgroundColor: 'transparent',
    });
    self.postMessage(svg);
};