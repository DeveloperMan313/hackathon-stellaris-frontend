<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import CometCard from "$lib/templates/CometCard.svelte";
  import Navbar from "$lib/templates/Navbar.svelte";
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
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as i (i)}
      <CometCard />
    {/each}
  </div>
</div>
