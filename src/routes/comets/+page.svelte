<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import CometCard from "$lib/templates/CometCard.svelte";
  import Navbar from "$lib/templates/Navbar.svelte";
  import { CometApi } from "$lib/api/comet";
  import { onMount } from "svelte";
  import type { CometProps } from "$lib/types";

  let comets: Array<CometProps> = $state([]);

  onMount(async () => {
    try {
      const response = await CometApi.getAll();
      comets = response.comets || [];
    } catch (error) {
      console.error("Failed to fetch comets:", error);
    }
  });
</script>

<Navbar />
<div class="w-full mt-40 px-5 flex flex-col items-center gap-10">
  <div class="flex flex-row gap-2 h-10">
    <Input
      type="text"
      placeholder="Название кометы"
      class="w-96 h-full shrink-0"
    />
    <Button class="h-full cursor-pointer">Найти</Button>
  </div>
  <div class="w-full grid grid-cols-6 gap-6">
    {#each comets as comet (comet.id)}
      <CometCard {...comet} />
    {/each}
  </div>
</div>
