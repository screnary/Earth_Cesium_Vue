<template>
  <!-- <h1>world</h1> -->
  <div id="cesiumContainer"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
// var Cesium = require('cesium/Cesium');
import "cesium/Widgets/widgets.css";

export default {
  name: "earth",
  mounted() {
    console.log(Cesium);
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMzZlNDhkNi1kNzBkLTRkOTctYjNjNi1lOWMxMGQwMDNlZDMiLCJpZCI6NzIxMzksImlhdCI6MTYzNTgzMDY5M30.pcO7OsxlM3nSzKOl3AYsRhoT8UYqqDnmVUU2iu2MXQ8";
    var viewer = new Cesium.Viewer("cesiumContainer", {
      scene3DOnly: true,
      selectionIndicator: false,
      baseLayerPicker: false,
    });

    // // Remove default base layer
    viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
    // // Add Sentinel-2 imagery
    viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3954 }));
    // // Add ArcGIS imagery
    // viewer.imageryLayers.addImageryProvider( new Cesium.ArcGisMapServerImageryProvider({
    //       url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    //   }));
    
    // Load Cesium World Terrain
    viewer.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask : true,
        requestVertexNormals : true
    });
    // Enable depth testing so things behind the terrain disappear
    viewer.scene.globe.depthTestAgainstTerrain = true;
    // Enable lighting based on sun/moon positions
    viewer.scene.globe.enableLighting = true;



  },
};
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
