window.onload = playBall;
window.oncontextmenu = () => false;

window.onkeydown = async (event) => {
	if (['Control', 'Alt', 'Delete', 'F4'].includes(event.key)) {
		await proCreate(6);
		alert("Annoying ela teachers lol");
	}

	return null;
};
