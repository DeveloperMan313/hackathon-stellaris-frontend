<script lang="ts">
  import InputField from "$lib/templates/InputField.svelte";
  import { usernameGetError } from "$lib/validation";
  import { AuthApi } from "$lib/api";
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import type { LoginResponse } from "$lib/types";

  let usernameValue = $state("");
  let usernameIsValid = $state(false);

  let passwordValue = $state("");

  let registrationStage = $state(0);

  const advanceStage = () => {
    registrationStage += 1;
  };

  const makeRequest = async () => {
    try {
      await AuthApi.logIn({
        username: usernameValue,
        password: passwordValue,
      });

      goto(resolve("/"));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Login failed");
    }
  };
</script>

<div class="flex h-full w-full items-center justify-center">
  <div class="flex w-72 flex-row overflow-hidden rounded-2xl bg-background">
    <div
      class="flex w-full shrink-0 flex-col gap-4 p-6 transition-all duration-500"
      style:margin-left={`${-100 * registrationStage}%`}
    >
      <InputField
        type="text"
        getError={usernameGetError}
        bind:value={usernameValue}
        bind:isValid={usernameIsValid}
        label="Имя пользователя"
        placeholder="user123"
        noSpaces={true}
      />
      <Button
        class="cursor-pointer"
        onclick={advanceStage}
        disabled={!usernameIsValid}>Далее</Button
      >
    </div>
    <div class="flex w-full shrink-0 flex-col gap-4 p-6">
      <InputField
        type="password"
        bind:value={passwordValue}
        label="Пароль"
        placeholder="Введите пароль"
        noSpaces={true}
      />
      <Button
        class="cursor-pointer"
        onclick={makeRequest}
        disabled={passwordValue.length < 8}>Войти</Button
      >
    </div>
  </div>
</div>
