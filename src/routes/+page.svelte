<script lang="ts">
  import { formats, type Format, getStringify, getParser } from '$lib';

  let from: Format = 'json';
  let to: Format = 'json5';
  let source = '';
  let converted = '';

  let parseError = '';
  let stringifyError = '';

  function copy(s: string) {
    navigator.clipboard.writeText(s);
  }

  $: {
    let data: any = undefined;

    const parser = getParser(from);
    const stringify = getStringify(to);

    try {
      data = parser(source);
      parseError = '';
    } catch (e) {
      if (e instanceof Object) {
        parseError = e.toString();
      }
    }

    if (data !== undefined) {
      try {
        converted = stringify(data);
        stringifyError = '';
      } catch (e) {
        if (e instanceof Object) {
          stringifyError = e.toString();
        }
      }
    }
  }
</script>

<div class="flex flex-col w-screen h-screen items-center justify-center">
  <div class="max-w-[1000px] w-full">
    <h1 class="text-2xl text-orange-600 font-bold mb-5 text-center">
      JSON, JSON5, TOML, YAML Converter
    </h1>
    <div class="mb-5 flex flex-row w-full text-sm">
      <div class="selector text-right">
        <select id="from" bind:value={from}>
          {#each formats as format}
            <option value={format}>{format}</option>
          {/each}
        </select>
      </div>
      <div class="w-6 text-center">➔</div>
      <div class="selector text-left">
        <select id="from" bind:value={to}>
          {#each formats as format}
            <option value={format}>{format}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="flex flex-row w-full gap-x-6">
      <div class="source">
        <div class="button text-right">
          <button on:click={() => copy(source)}>Copy</button>
        </div>
        <textarea class="text" bind:value={source} />
        <div class="error">
          {parseError}
        </div>
      </div>
      <div class="source">
        <div class="button text-left">
          <button on:click={() => copy(converted)}>Copy</button>
        </div>
        <textarea class="text" value={converted} disabled />
        <div class="error">
          {stringifyError}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .selector {
    @apply flex-1;
  }

  .selector select {
    @apply px-2 py-1 rounded-sm bg-white border;
  }

  .source {
    @apply flex-1;
  }

  .source .text {
    @apply border p-2 text-xs w-full h-[400px];
  }

  .source .error {
    @apply h-10 text-xs text-orange-600 font-semibold;
  }

  .source .button {
    @apply mb-2;
  }

  .source .button button {
    @apply px-2 py-1 rounded-sm text-white text-xs bg-orange-600;
  }

  .source .button button:hover {
    @apply bg-orange-700;
  }
</style>
