<script lang="ts">
	import {Icon} from "./index";

	export let text: string = "";
	export let icon: string = "";
	export let tooltip: string = "";
	export let size: number = null;
	export let onClick: () => void = () => {};

</script>

<button
	class={$$props.class}
	class:translator-icon-text={icon}
	aria-label={tooltip}
	on:click={() => onClick()}
>
	{#if text}
		<div>{ text }</div>
	{/if}
	{#if icon}
	<Icon
		icon={icon}
		size={size}
	/>
	{/if}
</button>
