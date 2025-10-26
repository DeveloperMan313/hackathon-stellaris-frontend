<script lang="ts">
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Upload } from "@lucide/svelte";
  import { setContext } from "svelte";
  import type { ObservationProps } from "$lib/types";
  import Observation from "$lib/templates/Observation.svelte";
  import Navbar from "$lib/templates/Navbar.svelte";
  import { CometApi } from "$lib/api/comet";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let cometName = $state("");
  let observations = $state<ObservationProps[]>([]);

  setContext("observations", {
    removeObservation: (id: number) => {
      observations = observations.filter((obs) => obs.id !== id);
    },

    handlePhotoUpload: (event: Event, observationId: number) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const observationsCopy = [...observations];
          const observationIndex = observationsCopy.findIndex(
            (obs) => obs.id === observationId,
          );
          if (observationIndex !== -1) {
            observationsCopy[observationIndex].photo = file;
            observationsCopy[observationIndex].photoPreview = e.target
              ?.result as string;
            observations = observationsCopy;
          }
        };
        reader.readAsDataURL(file);
      }
    },

    removePhoto: (observationId: number) => {
      const observationsCopy = [...observations];
      const observationIndex = observationsCopy.findIndex(
        (obs) => obs.id === observationId,
      );
      if (observationIndex !== -1) {
        observationsCopy[observationIndex].photo = null;
        observationsCopy[observationIndex].photoPreview = "";
        observations = observationsCopy;
      }
    },
  });

  onMount(async () => {
    try {
      const cometId = Number($page.params.id);
      const comet = await CometApi.getComet({ id: cometId });
      cometName = comet.name;

      observations = comet.observations.map((obs, index) => ({
        id: index,
        declination: obs.declination.toString(),
        rightAscension: obs.rightAscension.toString(),
        time: new Date(obs.timestamp * 1000),
        editable: false,
        photo: null,
        photoPreview: obs.photo ? obs.photo : "",
      }));
    } catch (error) {
      console.error("Failed to fetch comet:", error);
    }
  });
</script>

<Navbar />
<div class="min-h-screen bg-background flex justify-center items-center">
  <Card class="w-2xl">
    <CardHeader>
      <CardTitle class="text-2xl font-bold">Комета: {cometName}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="space-y-2">
        <div class="text-sm font-medium leading-none">Название кометы</div>
        <div class="text-lg font-semibold">{cometName}</div>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Наблюдения</h3>
        </div>
        {#each observations as observation (observation.id)}
          <Observation
            id={observation.id}
            bind:declination={observation.declination}
            bind:rightAscension={observation.rightAscension}
            bind:time={observation.time}
            editable={observation.editable}
            bind:photoPreview={observation.photoPreview}
          />
        {:else}
          <div
            class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center"
          >
            <Upload size={48} class="text-muted-foreground mb-4" />
            <p class="text-muted-foreground">Нет наблюдений</p>
            <p class="text-sm text-muted-foreground mt-1">
              У этой кометы пока нет наблюдений
            </p>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>
