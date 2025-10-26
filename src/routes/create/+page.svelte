<script lang="ts">
  import InputField from "$lib/templates/InputField.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Plus, Upload } from "@lucide/svelte";
  import { setContext } from "svelte";
  import type {
    CreateCometRequest,
    ObservationData,
    ObservationProps,
  } from "$lib/types";
  import Observation from "$lib/templates/Observation.svelte";
  import Navbar from "$lib/templates/Navbar.svelte";
  import { CometApi } from "$lib/api/comet";

  let cometName = $state("");
  let observations = $state<ObservationProps[]>([]);

  let observationId = 0;

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

  const addObservation = () => {
    observations = [
      ...observations,
      {
        id: observationId++,
        declination: "",
        rightAscension: "",
        time: new Date(),
        editable: true,
        photo: null,
        photoPreview: "",
      },
    ];
  };

  const createComet = async () => {
    const observationsData = await Promise.all(
      observations.map(
        async (obs) =>
          ({
            declination: Number(obs.declination),
            rightAscension: Number(obs.rightAscension),
            timestamp: Math.floor(obs.time.getTime() / 1000),
            photo: obs.photo ? await convertFileToBase64(obs.photo) : "",
          }) as ObservationData,
      ),
    );

    CometApi.create({
      name: cometName,
      observations: observationsData,
    } as CreateCometRequest);

    cometName = "";
    observations = [];
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
</script>

<Navbar />
<div class="min-h-screen bg-background flex justify-center items-center">
  <Card class="w-2xl">
    <CardHeader>
      <CardTitle class="text-2xl font-bold">Создание кометы</CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="space-y-2">
        <InputField
          type="text"
          bind:value={cometName}
          label="Название кометы"
          placeholder="Введите название кометы"
          noSpaces={false}
          id="comet-name"
        />
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Наблюдения</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onclick={addObservation}
            class="flex items-center gap-2"
          >
            <Plus size={16} />
            Добавить наблюдение
          </Button>
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
            <p class="text-muted-foreground">Нет добавленных наблюдений</p>
            <p class="text-sm text-muted-foreground mt-1">
              Нажмите "Добавить наблюдение", чтобы начать
            </p>
          </div>
        {/each}
      </div>
      <div class="flex justify-end pt-4">
        <Button
          onclick={createComet}
          disabled={!cometName.trim() || observations.length === 0}
          class="px-8"
        >
          Создать комету
        </Button>
      </div>
    </CardContent>
  </Card>
</div>
