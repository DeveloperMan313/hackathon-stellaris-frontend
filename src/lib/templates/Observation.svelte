<script lang="ts">
  import InputField from "$lib/templates/InputField.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent } from "$lib/components/ui/card/index.js";
  import { X, Upload } from "@lucide/svelte";
  import { getContext } from "svelte";
  import type { ObservationProps } from "$lib/types";

  let {
    id,
    declination = $bindable(),
    rightAscension = $bindable(),
    time = $bindable(),
    editable,
    photoPreview = $bindable(),
  }: ObservationProps = $props();

  let timeStr = $state("");

  const { removeObservation, handlePhotoUpload, removePhoto } = getContext(
    "observations",
  ) as {
    removeObservation: (id: number) => void;
    handlePhotoUpload: (event: Event, observationId: number) => void;
    removePhoto: (observationId: number) => void;
  };
</script>

<Card class="border-dashed">
  <CardContent class="p-4">
    <div class="flex items-start justify-between">
      <h4 class="font-medium">Наблюдение</h4>
      {#if editable}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onclick={() => removeObservation(id)}
          class="h-8 w-8 p-0"
        >
          <X size={16} />
        </Button>
      {/if}
    </div>

    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="space-y-4">
        <div class="space-y-2">
          <InputField
            type="text"
            bind:value={declination}
            label="Склонение"
            placeholder="+45°30'15&quot;"
            noSpaces={false}
            id={"declination-" + id}
            disabled={!editable}
          />
        </div>
        <div class="space-y-2">
          <InputField
            type="text"
            bind:value={rightAscension}
            label="Прямое восхождение"
            placeholder="+45°30'15&quot;"
            noSpaces={false}
            id={"right-ascension-" + id}
            disabled={!editable}
          />
        </div>
        <div class="space-y-2">
          <InputField
            type="text"
            bind:value={timeStr}
            label="Время наблюдения"
            placeholder="14:32:12"
            noSpaces={false}
            id={"time-" + id}
            disabled={!editable}
          />
        </div>
      </div>
      <div class="space-y-4">
        <label for={"photo-" + id} class="text-sm font-medium leading-none"
          >Фотография</label
        >
        {#if photoPreview}
          <div class="relative">
            <img
              src={photoPreview}
              alt="Предпросмотр фотографии"
              class="h-32 w-full rounded-md object-cover border"
            />
            {#if editable}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onclick={() => removePhoto(id)}
                class="absolute -top-2 -right-2 h-6 w-6 p-0"
              >
                <X size={12} />
              </Button>
            {/if}
          </div>
        {:else if editable}
          <label
            class="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 transition-colors hover:bg-muted/50"
          >
            <div
              class="flex flex-col items-center justify-center gap-2 p-4 text-center"
            >
              <Upload size={24} class="text-muted-foreground" />
              <span class="text-sm text-muted-foreground"
                >Добавить фотографию</span
              >
            </div>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              onchange={(e) => handlePhotoUpload(e, id)}
              id={"photo-" + id}
            />
          </label>
        {:else}
          <div
            class="flex aspect-video w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 p-4 text-center"
          >
            <span class="text-sm text-muted-foreground"
              >Фотография отсутствует</span
            >
          </div>
        {/if}
      </div>
    </div>
  </CardContent>
</Card>
