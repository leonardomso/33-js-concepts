// script.ts
const button = document.getElementById('myButton') as HTMLButtonElement;

if (button) {
    button.addEventListener('click', () => {
        alert('Button Clicked!');
    });
}
