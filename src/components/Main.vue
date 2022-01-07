<template>
  <div class="container">
    <div class="row form">
      <div class="col-12 col-md-3">
        <label for="number-input">Number of images</label>
        <b-form-input
          id="number-input"
          type="number"
          v-model="numberOfImages"
          min="1"
          max="50"
          placeholder="Number of images"
        ></b-form-input>
      </div>
      <div class="col-12 col-md-3">
        <label for="date-picker">Choose a date</label>
        <b-form-datepicker
          id="date-picker"
          v-model="date"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          :max="max"
          placeholder="Choose a date"
          locale="en"
          today-button
          reset-button
          close-button
        >
        </b-form-datepicker>
      </div>
      <div class="col-12 col-md-3">
        <b-button
          id="btn"
          type="button"
          variant="primary"
          @click="fetchImages()"
          >Submit</b-button
        >
      </div>
    </div>

    <Images v-if="!noImages || !noData" :items="getData"></Images>

    <div class="row" v-if="noImages">
      <div class="col-12" style="text-align: center">
        <p>No photos avaible for this date</p>
      </div>
    </div>

    <div class="row" v-if="noData">
      <div class="col-12" style="text-align: center">
        <p>Please select date and number of images</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../styles/style.scss";
</style>

<script>
const Images = () => import("./Images.vue");
export default {
  components: {
    Images,
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      date: "",
      max: today,
      numberOfImages: "",
      images: [],
      noData: true,
      noImages: false,
      array: [],
    };
  },
  watch: {
    images() {
      if (this.images.length === 0) {
        this.noImages = true;
      } else {
        this.noImages = false;
      }
    },
    numberOfImages() {
      document.querySelector("input").addEventListener("input", (e) => {
        const el = e.target || e;

        if (el.type == "number" && el.max && el.min) {
          let value = parseInt(el.value);
          el.value = value; 
          let max = parseInt(el.max);
          let min = parseInt(el.min);
          if (value > max) el.value = el.max;
          if (value < min) el.value = el.min;
        }
      });
    },
  },
  computed: {
    getData() {    

      return this.images;
    },
  },
  methods: {
    async fetchImages() {
      const el = document.getElementById("lightgallery");
      const apiKey = "EiE2HJg9OV8nS1N2iDSmAkPGCrNwVJZuayqBSrFM";

      if (this.date !== "" && this.numberOfImages !== "") {
        this.noData = false;
        const response = await fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page=5&earth_date=" +
            this.date +
            "&api_key=" +
            apiKey
        );
        const data = await response.json();
        this.images = [];
        data.photos.slice(0, this.numberOfImages).forEach((photo) => {
          this.images.push(photo);
        });

        await this.$nextTick(() => {
          if (this.images.length !== 0) {
            if (window.lgData[el.getAttribute("lg-uid")]) {
              window.lgData[el.getAttribute("lg-uid")].destroy(true);
              window.lightGallery(el, { selector: ".card" });
            } else {
              window.lightGallery(el, { selector: ".card" });
            }
          }
        });
      } else {
        this.images = [];
        this.noData = true;
      }
    },
  },
};
</script>
