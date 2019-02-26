function include(){
    const links = ['<link rel="apple-touch-icon" sizes="57x57" href="img/icons/favicon/apple-icon-57x57.png">',
    '<link rel="apple-touch-icon" sizes="60x60" href="img/icons/favicon/apple-icon-60x60.png">',
    '<link rel="apple-touch-icon" sizes="72x72" href="img/icons/favicon/apple-icon-72x72.png">',
    '<link rel="apple-touch-icon" sizes="76x76" href="img/icons/favicon/apple-icon-76x76.png">',
    '<link rel="apple-touch-icon" sizes="114x114" href="img/icons/favicon/apple-icon-114x114.png">',
    '<link rel="apple-touch-icon" sizes="120x120" href="img/icons/favicon/apple-icon-120x120.png">',
    '<link rel="apple-touch-icon" sizes="144x144" href="img/icons/favicon/apple-icon-144x144.png">',
    '<link rel="apple-touch-icon" sizes="152x152" href="img/icons/favicon/apple-icon-152x152.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="img/icons/favicon/apple-icon-180x180.png">',
    '<link rel="icon" type="image/png" sizes="192x192"  href="img/icons/favicon/android-icon-192x192.png">',
    '<link rel="icon" type="image/png" sizes="32x32" href="img/icons/favicon/favicon-32x32.png">',
    '<link rel="icon" type="image/png" sizes="96x96" href="img/icons/favicon/favicon-96x96.png">',
    '<link rel="manifest" href="img/icons/favicon/manifest.json">'];
    
    const meta = ['<meta name="msapplication-TileColor" content="#ffffff">',
    '<meta name="msapplication-TileImage" content="img/icons/favicon/ms-icon-144x144.png">',
    '<meta name="theme-color" content="#ffffff"></meta>'];
    
    const head = document.getElementsByTagName('head')[0];
    for(var i = 0; i < links.length; i++){
        head.innerHTML += links[i];
    }
    for(var i = 0; i < meta.length; i++){
        head.innerHTML += links[i];
    }
}

include();