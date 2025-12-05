import DottedMap from "dotted-map";

function projectPoint(lat: number, lng: number) {
    const x = (lng + 180) * (1056 / 360);
    const y = (90 - lat) * (495 / 180);
    return { x, y };
}

function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
    const midX = (start.x + end.x) / 2;
    const deltaX = Math.abs(start.x - end.x);
    const curveHeight = Math.min(deltaX / 2 + 20, 80);
    const midY = Math.min(start.y, end.y) - curveHeight;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

self.onmessage = (e) => {
    const { routes } = e.data;

    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
        radius: 0.22,
        color: 'currentColor',
        shape: "circle",
        backgroundColor: 'transparent',
    });

    const processedRoutes = routes.map((dot: any) => {
        const start = projectPoint(dot.start.lat, dot.start.lng);
        const end = projectPoint(dot.end.lat, dot.end.lng);
        const path = createCurvedPath(start, end);
        return {
            start,
            end,
            path
        };
    });

    self.postMessage({
        mapSvg: svg,
        routes: processedRoutes
    });
};