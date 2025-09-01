<script lang="ts">
  import { goto } from "$app/navigation";
  let email = "";
  let message = "";
  let error = "";

  async function submit() {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      message = "Check your email for the reset link.";
      console.log("Reset link:", data.resetLink); // ⚠️ Dev only
    } else {
      error = data.error;
    }
  }
</script>

<h1>Forgot Password</h1>
<input type="email" bind:value={email} placeholder="Enter your email" />
<button onclick={submit}>Send Reset Link</button>
<p>{message}</p>
<p class="text-red-500">{error}</p>
