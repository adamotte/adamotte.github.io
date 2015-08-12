---
layout: post

title: "Partie 2 : Les pièces et composants"
subtitle: "Créer sa station météo connectée"
excerpt: "Créer sa station météo connectée"

cover_image: electronic.jpg

categorie: domotique

tags: weatherstation, iot, diy, raspberry, arduino

---

Alors après vous avoir présenté l'idée générale la semaine dernière, j'en ai profité pour peaufiner la conception de mon projet.
A l'heure actuelle, il se présente comme suit :

#### L'écran
Il sera composé principalement d'un écran de pc portable que j'ai récupéré de mon vieux HP 6735s. C'est un écran LCD donc, de 15"6 pouces pour une résolution max de 1280x800 (référence écran B154EW02).

Pour le faire fonctionner hors carte mère, il faut un kit LCD afin d'interpréter la connection LVDS. On peut en trovuer sur ebay assez facilement, j'en ai choisi un offrant toutes les connexions qui vont bien, VGA, DVI, HDMI et Audio. Le kit comprend une carte controlleur, un inverter et le cable LDVS. Vous pouvez aussi en trouver en pack avec une alimentation. Pour ma part, j'ai décidé de faire encore de la récup, et de garder le bloc alimentation du pc portable -toujours fonctionnel lui-.

<center>
    <figure>
        <div class="full zoomable">
            <img src="/images/posts/lcd-board.jpg">
        </div>
        <figcaption>fig 1. LCD Controller, Inverter and Switch</figcaption>
    </figure>
</center>

Enfin pour l'esthétique quand même, j'utilise un cadre photo Ikea RIBBA de 30x40 cm afin d'y caler le LCD. Et comme il est un peu épais (4cm) ca me permet de cacher toute l'électronique derrière.

<center>
    <figure>
        <div class="full zoomable">
            <img src="/images/posts/ribba.jpg">
        </div>
        <figcaption>fig 2. Un cadre photo Ikea RIBBA comme support LCD</figcaption>
    </figure>
</center>

#### Les capteurs
Principalement température et humidité (DHT22 car il offre une meilleure précision que de DHT11) et un capteur barométrique également (moi j'ai pris un BMP085 mais BOSH vient de le remplacer par le BMP180 en tout point identique). Ils seront pilotés via des arduino pro mini (j'ai pris la version 3.3V 8Mhz afin de limiter la consommation au maximum), connectés via radio fréquence 2.4Ghz (nRF24L01+) et alimentés via 2 piles LR06 AA.

<center>
    <figure>
        <div class="full zoomable">
            <img src="/images/posts/dht22-bmp085-promini-nrf24.jpg">
        </div>
        <figcaption>fig 3. DHT22, BMP085, Arduino Pro mini et nRF24L01+</figcaption>
    </figure>
</center>

#### Le controleur
Ce sera un rapsberry pi 2. Astuce, il sera alimenté via le controlleur de l'écran car sur ce dernier il y a un 5V 2A bien stable qui est récupérable. Sur les ports GPIO seront connectés le capteur barométrique et un module RF de réception. Pour ce dernier j'ai choisi d'en prendre un avec antenne SMA afin d'améliorer la réception (au cas où). Pour la communication, il aura aussi un dongle Wifi (TP-LINK TL-WN725N) en prévision d'une interconnection avec mon NAS Synology.

J'ai prévu d'installer un Raspbian modifié, celui de Hypriot, optimizé pour Docker et avec des precompilations de drivers WiFi entre autre. Côté sofware, je pars sur le combo OpenHAB comme plateforme domotique (que j'ai déjà essayé il y a quelque temps et qui est vraiment top car il gère tout en mode add-ons et c'est opensource!) et InfluxDB comme base de donnée (bien que jeune, j'ai pu l'essayer sur des millions de données dans un projet pro et elle est efficace).


---

Bien évidemement je passe sous silence une bonne partie du matériel "de développement" utile mais pas obligatoire. Si vous voulez en savoir plus, laissez moi un commentaire.

Dans mon prochain article, je présenterai la réalisation d'un des capteurs, de sa construction et son installation en passant par sa programmation.
