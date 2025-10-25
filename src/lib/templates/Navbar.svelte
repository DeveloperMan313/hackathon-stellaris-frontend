<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<nav
  class="fixed top-0 left-0 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
  <div class="container mx-auto flex h-16 items-center justify-between px-4">
    <div class="flex items-center gap-2">
      <h1 class="text-2xl font-bold tracking-tight text-foreground">
        Stellaris
      </h1>
    </div>
    <Button variant="outline" size="sm">Войти</Button>
  </div>
</nav>
