<script lang="ts">
  import { resolve } from "$app/paths";
  import Card from "$lib/components/ui/card/card.svelte";
  import type { CometProps } from "$lib/types";

  let { id, name, observations }: CometProps = $props();
</script>

<a href={resolve(`/comets/${id}/`)} class="block">
  <Card class="w-full pt-0 pb-2 pr-0 gap-2 cursor-pointer">
    {#if observations.length > 0 && observations[0].photo}
      <img
        class="size-48 bg-purple-500 object-cover"
        src={`data:image/jpeg;base64,${observations[0].photo}`}
        alt={name}
      />
    {:else}
      <div class="size-48 bg-purple-500 flex items-center justify-center">
        <span class="text-white text-sm">Нет фото</span>
      </div>
    {/if}
    <h4 class="px-4 text-center line-clamp-2 h-[2lh]">{name}</h4>
  </Card>
</a>
