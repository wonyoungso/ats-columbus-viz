
export const windowResize = (dimension) => {
  return {
    type: 'WINDOW_RESIZE',
    payload: {
      windowWidth: dimension.width,
      windowHeight: dimension.height
    }
  }
}

export const changeMapLoaded = (mapLoaded) => {
  return {
    type: "CHANGE_MAP_LOADED",
    payload: {
      mapLoaded: mapLoaded
    }
  }
}