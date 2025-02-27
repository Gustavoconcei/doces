window.onload = function() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'none'; // Esconde a sidebar ao carregar
};

function toggle(el){
    var display = document.getElementById(el).style.display;
    if(display == 'none'){
        document.getElementById(el).style.display = 'block';
    }
    else{
        document.getElementById(el).style.display = 'none';
    }
}