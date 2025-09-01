<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<h1 class="text-2xl font-bold mb-4">Dashboard</h1>

{#if data.user}
  <p>Welcome back, 
    {data.user.firstName} 
    {data.user.lastName}!</p>
  <p>Email: {data.user.email}</p>
{:else}
  <p>Loading...</p>
{/if}
