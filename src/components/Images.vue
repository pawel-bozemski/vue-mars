<template>
  <div
    class="row"
    id="lightgallery"
    style="margin-top: 15px; justify-content: center"
  >
    <div
      class="col-12 col-md-6 col-lg-3 card-nasa"
      v-for="image in items"
      :key="image.id"
    >
      <div class="card" :data-src="image.img_src" style="width: 18rem">
        <a
          class="item_gallery"
          :href="image.img_src"
          style="text-decoration: none; color: #000"
        >
          <img class="card-img-top" :src="image.img_src" alt="Card image cap" />
        </a>
        <div class="card-body">
          <h5 class="card-title">{{ image.id }}</h5>
          <p class="card-text">
            {{ image.earth_date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
};
</script>
