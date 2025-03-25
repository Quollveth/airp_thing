<script setup lang="ts">
interface Props {
  value: number;
}
const props = defineProps<Props>();
const progress = useTemplateRef("progress");
onMounted(() => {
  progress.value!.style.setProperty("--progress", `${props.value}`);
});
</script>

<template>
  <div class="progress" ref="progress">
    <div class="bar">
      <div class="progress-value"></div>
    </div>
  </div>
</template>

<style scoped>
body {
  background: black;
}

.progress {
  --progress: 0%;

  width: 100%;
  height: 20px;
  border: 1px solid #fff;
  padding: 6px 5px;
  /* box-shadow: 0 0 10px #aaa;*/
}

.progress .bar {
  width: var(--progress);
  height: 100%;
  background: linear-gradient(gold, #c85, gold);
  background-repeat: repeat;
  /*box-shadow: 0 0 10px 0px orange;*/
  animation:
    shine 4s ease-in infinite,
    end 1s ease-out 1;
  transition: width 3s ease;
}

@property --progress {
  syntax: "<length>";
  initial-value: 0%;
  inherits: true;
}

/*
@keyframes shine {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 50px;
  }
}

@keyframes end {
  0%,
  100% {
    box-shadow: 0 0 10px 0px orange;
  }
  50% {
    box-shadow: 0 0 15px 5px orange;
  }
}
*/
</style>
