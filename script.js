function convert() {
    // меняем ' на "
    let text = document.getElementById('text').innerHTML;
    let regexp1 = /\'/gm;
    document.getElementById('text').innerHTML = text.replace(regexp1,'"');

    // меняем " на ' в сокращениях
    text = document.getElementById('text').innerHTML;
    let regexp2 = /(\w)\"(\w)/g;
    document.getElementById('text').innerHTML = text.replace(regexp2,"$1'$2");

}