<script lang="ts">
    import InputField from "$lib/templates/InputField.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "$lib/components/ui/card/index.js";
    import { Plus, X, Upload } from "@lucide/svelte";

    type Observation = {
        id: string;
        declination: string;
        rightAscension: string;
        photo?: File | null;
        photoPreview?: string;
    };

    let cometName = $state("");
    let observations = $state<Observation[]>([]);

    const addObservation = () => {
        observations = [
            ...observations,
            {
                id: crypto.randomUUID(),
                declination: "",
                rightAscension: "",
                photo: null,
                photoPreview: "",
            },
        ];
    };

    const removeObservation = (id: string) => {
        observations = observations.filter((obs) => obs.id !== id);
    };

    const handlePhotoUpload = (event: Event, observationId: string) => {
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
    };

    const removePhoto = (observationId: string) => {
        const observationsCopy = [...observations];
        const observationIndex = observationsCopy.findIndex(
            (obs) => obs.id === observationId,
        );
        if (observationIndex !== -1) {
            observationsCopy[observationIndex].photo = null;
            observationsCopy[observationIndex].photoPreview = "";
            observations = observationsCopy;
        }
    };

    const createComet = () => {
        // Here you would typically send the data to your API
        console.log("Creating comet:", {
            name: cometName,
            observations: observations.map((obs) => ({
                declination: obs.declination,
                rightAscension: obs.rightAscension,
                photo: obs.photo,
            })),
        });

        // Reset form
        cometName = "";
        observations = [];
    };
</script>

<div class="min-h-screen bg-background p-8">
    <div class="mx-auto max-w-2xl">
        <Card class="w-full">
            <CardHeader>
                <CardTitle class="text-2xl font-bold">Создание кометы</CardTitle
                >
            </CardHeader>
            <CardContent class="space-y-6">
                <!-- Название кометы -->
                <div class="space-y-2">
                    <label
                        for="comet-name"
                        class="text-sm font-medium leading-none"
                        >Название кометы</label
                    >
                    <InputField
                        type="text"
                        bind:value={cometName}
                        placeholder="Введите название кометы"
                        noSpaces={false}
                        id="comet-name"
                    />
                </div>

                <!-- Область с наблюдениями -->
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
                        <Card class="border-dashed">
                            <CardContent class="p-4">
                                <div class="flex items-start justify-between">
                                    <h4 class="font-medium">
                                        Наблюдение {observations.indexOf(
                                            observation,
                                        ) + 1}
                                    </h4>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onclick={() =>
                                            removeObservation(observation.id)}
                                        class="h-8 w-8 p-0"
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>

                                <div
                                    class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
                                >
                                    <!-- Левый столбец - координаты -->
                                    <div class="space-y-4">
                                        <div class="space-y-2">
                                            <label
                                                for={"declination-" +
                                                    observation.id}
                                                class="text-sm font-medium leading-none"
                                                >Склонение</label
                                            >
                                            <InputField
                                                type="text"
                                                bind:value={
                                                    observation.declination
                                                }
                                                placeholder="Например: +45°30'15&quot;"
                                                noSpaces={false}
                                                id={"declination-" +
                                                    observation.id}
                                            />
                                        </div>
                                        <div class="space-y-2">
                                            <label
                                                for={"right-ascension-" +
                                                    observation.id}
                                                class="text-sm font-medium leading-none"
                                                >Прямое восхождение</label
                                            >
                                            <InputField
                                                type="text"
                                                bind:value={
                                                    observation.rightAscension
                                                }
                                                placeholder="Например: 14h30m45s"
                                                noSpaces={false}
                                                id={"right-ascension-" +
                                                    observation.id}
                                            />
                                        </div>
                                    </div>

                                    <!-- Правый столбец - фотография -->
                                    <div class="space-y-4">
                                        <label
                                            for={"photo-" + observation.id}
                                            class="text-sm font-medium leading-none"
                                            >Фотография</label
                                        >
                                        {#if observation.photoPreview}
                                            <div class="relative">
                                                <img
                                                    src={observation.photoPreview}
                                                    alt="Предпросмотр фотографии"
                                                    class="h-32 w-full rounded-md object-cover border"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onclick={() =>
                                                        removePhoto(
                                                            observation.id,
                                                        )}
                                                    class="absolute -top-2 -right-2 h-6 w-6 p-0"
                                                >
                                                    <X size={12} />
                                                </Button>
                                            </div>
                                        {:else}
                                            <label
                                                class="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 transition-colors hover:bg-muted/50"
                                            >
                                                <div
                                                    class="flex flex-col items-center justify-center gap-2 p-4 text-center"
                                                >
                                                    <Upload
                                                        size={24}
                                                        class="text-muted-foreground"
                                                    />
                                                    <span
                                                        class="text-sm text-muted-foreground"
                                                        >Добавить фотографию</span
                                                    >
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    class="hidden"
                                                    onchange={(e) =>
                                                        handlePhotoUpload(
                                                            e,
                                                            observation.id,
                                                        )}
                                                    id={"photo-" +
                                                        observation.id}
                                                />
                                            </label>
                                        {/if}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    {:else}
                        <div
                            class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center"
                        >
                            <Upload
                                size={48}
                                class="text-muted-foreground mb-4"
                            />
                            <p class="text-muted-foreground">
                                Нет добавленных наблюдений
                            </p>
                            <p class="text-sm text-muted-foreground mt-1">
                                Нажмите "Добавить наблюдение", чтобы начать
                            </p>
                        </div>
                    {/each}
                </div>

                <!-- Кнопка создания -->
                <div class="flex justify-end pt-4">
                    <Button
                        onclick={createComet}
                        disabled={!cometName.trim() ||
                            observations.length === 0}
                        class="px-8"
                    >
                        Создать комету
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</div>
