container.addEventListener('click', async () => {
	await proCreate(6);
	window.onbeforeunload = () => "Are you annoying?";
});

window.onload = playBall;
window.oncontextmenu = () => false;
window.onkeydown = async () => {
	if (['Control', 'Alt', 'Delete', 'F4'].includes(event.key)) {
		await proCreate(6);
		alert("Annoying ela teachers lol");
	}
	
	return null;
