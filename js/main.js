const d = document,
$buttons = Array.from(d.querySelectorAll(".btn")),
$screen = d.querySelector(".calc-container__screen"),
$darkTheme = d.querySelectorAll('*[data-dark-theme]'),
$btn = d.querySelector('.dark-theme-btn');



function darkMode(){
    $darkTheme.forEach((el) => el.classList.add('dark-theme'));
    $btn.textContent = 'Cambiar a modo claro'
    localStorage.setItem('dark-mode', 'true')
}

function lightMode(){
    $darkTheme.forEach((el) => el.classList.remove('dark-theme'));
    $btn.textContent = 'Cambiar a modo oscuro'
    localStorage.setItem('dark-mode', 'false')
}

  //Función para la calculadora
const calculator = () => {

    //Por cada botón, añado una función manejadora de eventos que evaluará los botones y reemplazará el texto de la pantalla display para luego eliminar/realizar una operación
  $buttons.forEach((button) => {


    button.addEventListener("click", (e) => {

        if(button.id != 'igual') {
            if ($screen.textContent === "0") {
                $screen.textContent = e.target.textContent;
            } else {
                $screen.textContent += button.textContent;
            }
        }

        deleteNumbers(button)

        equalsTo(button)


    });
  });
};


function deleteNumbers(button){
    if(button.classList.contains('delete')){
        $screen.textContent = '0';
      }
}

function equalsTo(button) {
    if(button.id === 'igual'){
        try{
            $screen.textContent = eval($screen.textContent)
        }
        catch {
            $screen.textContent = 'ERR';
            setTimeout(() => {
                $screen.textContent = '0'
            }, 1000)
        }
    }
}


const darkTheme = () => {

    d.addEventListener('click', (e) => {
        if (e.target === $btn){
            (e.target.textContent === 'Cambiar a modo oscuro') 
            ? darkMode()
            : lightMode()
        }
    })

}

d.addEventListener('DOMContentLoaded', (e) => {
    if(localStorage.getItem('dark-mode') === null || localStorage.getItem('dark-mode') === 'false'){
        lightMode();
    }

    if(localStorage.getItem('dark-mode') === 'true'){
        darkMode();
    }
})






darkTheme();




calculator();
