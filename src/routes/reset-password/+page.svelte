<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  let newPassword = "";
  let message = "";
  let error = "";

  $: token = $page.url.searchParams.get("token");

  async function submit() {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword })
    });

    const data = await res.json();
    if (res.ok) {
      message = "Password reset successful. Redirecting...";
      setTimeout(() => goto("/auth/signin"), 2000);
    } else {
      error = data.error;
    }
  }
</script>

<h1>Reset Password</h1>
<input type="password" bind:value={newPassword} placeholder="New password" />
<button onclick={submit}>Reset Password</button>
<p>{message}</p>
<p class="text-red-500">{error}</p>
