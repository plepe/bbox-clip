const turf = {
  bboxClip: require('@turf/bbox-clip').default
}

module.exports = function bboxClip (feature, bbox) {
  if (feature.geometry.type === 'GeometryCollection') {
    return {
      type: 'Feature',
      geometry: {
        type: 'GeometryCollection',
        geometries: feature.geometry.geometries.map(
          part => {
            return bboxClip({ type: 'Feature', geometry: part }, bbox).geometry
          }
        )
      },
      properties: feature.properties
    }
  } else {
    return turf.bboxClip(feature, bbox)
  }
}
