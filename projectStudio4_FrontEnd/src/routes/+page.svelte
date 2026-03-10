<script>
    import HeroSection from '$lib/HeroSection.svelte';
    import KeyBenefits from '$lib/KeyBenefits.svelte';
    let { data } = $props();

    let loggedInUser = data.loggedInUser || null;
</script>

<HeroSection {data} />
<KeyBenefits />
